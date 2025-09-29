const Footer: React.FC = () => {
  return (
    <footer className="w-full h-12 flex items-center justify-center border-t border-border">
      <p className="text-sm text-zinc-500">
        &copy; {new Date().getFullYear()} EMDR Exercise. All rights reserved.
      </p>
    </footer>
  );
};
export default Footer;
