import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="w-full px-4 h-12 flex items-center justify-between border-t border-border">
      <div className="flex items-center gap-2">
        <p className="text-sm text-zinc-500">&copy; Spoko.help</p>
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
    </footer>
  );
};
export default Footer;
