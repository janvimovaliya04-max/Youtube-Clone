import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YouTube Clone",
  description: "Built with Next.js, TypeScript, and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-screen w-screen overflow-hidden bg-white dark:bg-zinc-950 text-gray-900 dark:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
