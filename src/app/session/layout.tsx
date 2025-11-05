import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SessionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header isFullWidth />
      <div className="flex flex-1 w-full">{children}</div>
      <Footer isFullWidth />
    </>
  );
}
