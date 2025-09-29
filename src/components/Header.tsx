import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const Header: React.FC = () => {
  return (
    <header className="w-full fixed top-0 left-0 right-0 h-12 z-50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="mx-auto flex items-center justify-between h-full px-4">
        <Link href="/" className="text-lg font-bold">
          Home
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/session" className="text-lg font-bold">
            Session
          </Link>
        </div>
      </div>
    </header>
  );
};
export default Header;
