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
      <Header />
      <div className="flex flex-1 grow w-full justify-center">{children}</div>
      <Footer />
    </>
  );
}
