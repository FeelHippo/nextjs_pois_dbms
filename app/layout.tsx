import type { Metadata } from "next";
import "./globals.css";
import { NavLinks } from "./ui/nav-links";

export const metadata: Metadata = {
  title: "Points of Interest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>
          <NavLinks />
          { children }
        </main>
      </body>
    </html>
  );
}
