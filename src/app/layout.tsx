import type { Metadata, Viewport } from "next";
import "./globals.css";
import { cookies } from "next/headers";
import { THEME_COOKIE } from "@/lib/theme";
import ThemeProvider from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "EMDR Exercise",
  description: "Local bilateral visual/audio tool (not medical advice).",
};
export const viewport: Viewport = { colorScheme: "dark light" };

async function computeInitialClassFromCookie() {
  const cookie = (await cookies()).get(THEME_COOKIE)?.value as 
    | "light"
    | "dark"
    | undefined;
  return cookie || "light"
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialHtmlClass = await computeInitialClassFromCookie();
  return (
    <html lang="en" className={initialHtmlClass} suppressHydrationWarning>
      <body className="min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-white antialiased flex flex-col">
        <ThemeProvider />
        <Header />
        <main className="flex-1 pt-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
