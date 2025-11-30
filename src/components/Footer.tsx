import Link from "next/link";
import Container from "./landing/Container";

type FooterProps = { isFullWidth?: boolean };

const Footer: React.FC<FooterProps> = ({ isFullWidth }) => {
  return (
    <footer className="w-full h-12 border-t border-border">
      <Container isFullWidth={isFullWidth}>
        <div className="flex h-12 w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-sm text-zinc-500">&copy; EMDR4U</p>
            <p className="text-sm text-zinc-500">{new Date().getFullYear()}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-sm text-zinc-500">
              About
            </Link>
            <Link href="/privacy" className="text-sm text-zinc-500">
              Privacy policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
export default Footer;
