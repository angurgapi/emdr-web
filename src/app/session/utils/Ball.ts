import { soundService } from "@/lib/soundService";

export type Direction =
    | "leftToRight"
    | "topToBottom"
    | "diagLeftToRight"
    | "diagRightToLeft";

type Sign = 1 | -1;

export interface BallOptions {
    container: HTMLElement;             // the box that defines bounds
    mover: HTMLElement;                 // absolutely positioned wrapper for css translate
    size: number;                       // ball outer size in px
    oneWayTime: number;                 // seconds to traverse one axis at mult=1
    mult: number;                       // speed multiplier (0.5 | 1 | 1.5 | 2)
    direction: Direction;
    normalizeDiagonalSpeed?: boolean;   // keep overall velocity constant on diagonals (default: true)
    listenFullscreenEvents?: boolean;   // attach fullscreen listeners (default: true)
}

type Bounds = {
    minX: number; maxX: number;
    minY: number; maxY: number;
    travelX: number; travelY: number;
};

export class Ball {
    private container: HTMLElement;
    private mover: HTMLElement;

    private size: number;
    private oneWay: number;
    private mult: number;
    private direction: Direction;
    private normalizeDiag: boolean;
    private listenFS: boolean;

    // center coordinates
    private cx = 0;
    private cy = 0;

    // directions along axes
    private dirX: Sign = 1;
    private dirY: Sign = 1;

    // speeds in px/s (center-space)
    private speedX = 0;
    private speedY = 0;

    // time + animation frame
    private last: number | null = null;
    private raf: number | null = null;
    private isFirstMove = true;

    // measurements + listeners
    private ro: ResizeObserver | null = null;
    private _bounds: Bounds;
    private _onFS?: () => void;
    private _onResize?: () => void;

    // small scheduler to avoid recomputing many times per frame
    private recomputeRaf: number | null = null;

    constructor(opts: BallOptions) {
        this.container = opts.container;
        this.mover = opts.mover;
        this.size = opts.size;
        this.oneWay = opts.oneWayTime;
        this.mult = opts.mult;
        this.direction = opts.direction;
        this.normalizeDiag = opts.normalizeDiagonalSpeed ?? true;
        this.listenFS = opts.listenFullscreenEvents ?? true;

        this._bounds = this.measureBounds();

        // initial compute and placement
        this.recompute({ preserveProgress: false, resetTime: true });
        this.initByDirection();
        this.applyTransform();

        // observe container size changes
        this.ro = new ResizeObserver(() => {
            this.recompute({ preserveProgress: true, resetTime: true });
        });
        this.ro.observe(this.container);

        // (optional) browser fullscreen + window resize events
        if (this.listenFS) {
            this._onFS = () => this.recomputeAfterLayout();
            document.addEventListener("fullscreenchange", this._onFS);
            document.addEventListener("webkitfullscreenchange", this._onFS as EventListener);
            this._onResize = () => this.scheduleRecompute();
            window.addEventListener("resize", this._onResize);
        }
    }

    // public

    start() {
        if (this.raf != null) return;
        this.raf = requestAnimationFrame(this.tick);
    }

    stop() {
        if (this.raf != null) {
            cancelAnimationFrame(this.raf);
            this.raf = null;
        }
        this.last = null;
    }

    destroy() {
        this.stop();
        this.ro?.disconnect();
        this.ro = null;
        if (this._onFS) {
            document.removeEventListener("fullscreenchange", this._onFS);
            document.removeEventListener("webkitfullscreenchange", this._onFS as EventListener);
            this._onFS = undefined;
        }
        if (this._onResize) {
            window.removeEventListener("resize", this._onResize);
            this._onResize = undefined;
        }
    }

    setSize(px: number) {
        if (!Number.isFinite(px) || px <= 0) return;
        this.size = px;
        this.recompute({ preserveProgress: true, resetTime: true });
    }

    setMult(mult: number) {
        this.mult = mult;
        this.recompute({ preserveProgress: true, resetTime: false });
    }

    setDirection(dir: Direction) {
        this.direction = dir;
        this.initByDirection();
        this.last = null;
        this.isFirstMove = true;
        this.applyTransform();
    }

    reset() {
        this.initByDirection();
        this.last = null;
        this.isFirstMove = true;
        this.applyTransform();
    }

    recomputeAfterLayout() {
        this.stop(); // pause to avoid big dt jump
        requestAnimationFrame(() => {
            this.recompute({ preserveProgress: true, resetTime: true });
            requestAnimationFrame(() => {
                this.recompute({ preserveProgress: true, resetTime: true });
                this.start();
            });
        });
    }

    moveHorizontal(dt: number) {
        const { minX, maxX } = this._bounds;
        this.cx += this.dirX * this.speedX * dt;
        if (this.cx <= minX) {
            // console.log("cx<=minX", this.cx)
            this.cx = minX;
            this.dirX = 1;
            if (!this.isFirstMove) soundService.play("left");
        }
        else if (this.cx >= maxX) {
            // console.log("cx>=minX")
            this.cx = maxX;
            this.dirX = -1;
            if (!this.isFirstMove) soundService.play("right");
        }
        this.isFirstMove = false;
    }

    moveVertical(dt: number) {
        const { minY, maxY } = this._bounds;
        this.cy += this.dirY * this.speedY * dt;
        if (this.cy <= minY) { this.cy = minY; this.dirY = 1; }
        else if (this.cy >= maxY) { this.cy = maxY; this.dirY = -1; }
    }

    moveDiagLTR(dt: number) {
        const k = this.normalizeDiag ? 1 / Math.SQRT2 : 1;
        const { minX, maxX, minY, maxY } = this._bounds;
        this.cx += this.dirX * (this.speedX * k) * dt;
        this.cy += this.dirY * (this.speedY * k) * dt;

        if (this.cx <= minX) { this.cx = minX; this.dirX = 1; }
        else if (this.cx >= maxX) { this.cx = maxX; this.dirX = -1; }
        if (this.cy <= minY) { this.cy = minY; this.dirY = 1; }
        else if (this.cy >= maxY) { this.cy = maxY; this.dirY = -1; }
    }

    moveDiagRTL(dt: number) {
        this.moveDiagLTR(dt);
    }

    private r() { return this.size / 2; }

    private measureBounds(): Bounds {
        const r = this.r();
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        const minX = r;
        const minY = r;
        const maxX = Math.max(r, w - r);
        const maxY = Math.max(r, h - r);
        const travelX = Math.max(0, w - this.size);
        const travelY = Math.max(0, h - this.size);
        return { minX, maxX, minY, maxY, travelX, travelY };
    }

    private progress() {
        const { minX, maxX, minY, maxY } = this._bounds;
        const pxDen = Math.max(1e-6, (maxX - minX));
        const pyDen = Math.max(1e-6, (maxY - minY));
        const px = (this.cx - minX) / pxDen;
        const py = (this.cy - minY) / pyDen;
        return {
            px: Math.min(Math.max(px, 0), 1),
            py: Math.min(Math.max(py, 0), 1),
        };
    }

    private setFromProgress(px: number, py: number, B: Bounds) {
        const { minX, maxX, minY, maxY } = B;
        this.cx = minX + px * (maxX - minX);
        this.cy = minY + py * (maxY - minY);
    }

    public recompute(opts: { preserveProgress?: boolean; resetTime?: boolean } = {}) {
        const { preserveProgress = true, resetTime = true } = opts;

        const prevProg = preserveProgress ? this.progress() : null;

        this._bounds = this.measureBounds();

        this.speedX = (this._bounds.travelX / this.oneWay) * this.mult;
        this.speedY = (this._bounds.travelY / this.oneWay) * this.mult;

        if (prevProg) {
            this.setFromProgress(prevProg.px, prevProg.py, this._bounds);
        } else {
            const { minX, maxX, minY, maxY } = this._bounds;
            this.cx = Math.min(Math.max(this.cx, minX), maxX);
            this.cy = Math.min(Math.max(this.cy, minY), maxY);
        }

        if (resetTime) this.last = null;
        this.applyTransform();
    }

    private scheduleRecompute() {
        if (this.recomputeRaf != null) return;
        this.recomputeRaf = requestAnimationFrame(() => {
            this.recomputeRaf = null;
            this.recompute({ preserveProgress: true, resetTime: true });
        });
    }

    private initByDirection() {
        const B = this._bounds;
        const midX = (B.minX + B.maxX) / 2;
        const midY = (B.minY + B.maxY) / 2;

        this.dirX = 1; this.dirY = 1;

        switch (this.direction) {
            case "leftToRight":
                this.cx = B.minX; this.cy = midY; this.dirX = 1; break;
            case "topToBottom":
                this.cx = midX; this.cy = B.minY; this.dirY = 1; break;
            case "diagLeftToRight":
                this.cx = B.minX; this.cy = B.minY; this.dirX = 1; this.dirY = 1; break;
            case "diagRightToLeft":
                this.cx = B.maxX; this.cy = B.minY; this.dirX = -1; this.dirY = 1; break;
        }
    }

    private applyTransform() {
        const r = this.r();
        this.mover.style.transform =
            `translate3d(${this.cx - r}px, ${this.cy - r}px, 0)`;
    }

    private tick = (t: number) => {
        if (this.last == null) this.last = t;
        const dt = (t - this.last) / 1000;
        this.last = t;

        switch (this.direction) {
            case "leftToRight": this.moveHorizontal(dt); break;
            case "topToBottom": this.moveVertical(dt); break;
            case "diagLeftToRight": this.moveDiagLTR(dt); break;
            case "diagRightToLeft": this.moveDiagRTL(dt); break;
        }

        this.applyTransform();
        this.raf = requestAnimationFrame(this.tick);
    };
}

export default Ball;
