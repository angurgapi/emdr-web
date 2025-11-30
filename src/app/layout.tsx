import type { Metadata, Viewport } from "next";
import "./globals.css";
import { cookies } from "next/headers";
import { THEME_COOKIE } from "@/lib/theme";
import ThemeProvider from "@/components/ThemeProvider";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "EMDR4U | EMDR Therapy Online | BLS",
  description: "Bilateral stimulation tool for EMDR therapy",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "EMDR",
    "Bilateral Stimulation",
    "BLS",
    "Therapy",
    "Mental Health",
    "Self-Help",
    "PTSD",
    "Anxiety",
    "Depression",
    "Wellness",
    "Trauma",
  ],
};
export const viewport: Viewport = { colorScheme: "dark light" };

async function computeInitialClassFromCookie() {
  const cookie = (await cookies()).get(THEME_COOKIE)?.value as
    | "light"
    | "dark"
    | undefined;
  return cookie || "light";
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
        <div id="root" className="flex flex-col flex-1 pt-12 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
