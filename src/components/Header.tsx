import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import Container from "./landing/Container";

type HeaderProps = {
  isFullWidth?: boolean;
};

const Header: React.FC<HeaderProps> = ({ isFullWidth }) => {
  return (
    <header className="w-full flex items-center fixed top-0 left-0 right-0 h-12 z-50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <Container isFullWidth={isFullWidth}>
        <div className="mx-auto flex items-center justify-between h-full px-0">
          <Link href="/" className="text-lg font-bold text-[#36548A]">
            <Image
              className="dark:[filter:brightness(0)_invert(1)]"
              src="/sp.svg"
              alt="Spoko logo"
              width={55}
              height={40}
              priority
            />
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/session" className="text-lg font-bold text-primary">
              BLS session
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};
export default Header;
