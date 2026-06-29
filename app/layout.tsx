import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-playfair",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Ça Va - барбершоп + beauty, Екатеринбург",
  description:
    "Ça Va - барбершоп и beauty пространство в Екатеринбурге. Стрижки, борода, массаж и уход. Онлайн-запись.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cssVars = {
    "--pattern-image": `url(${basePath}/assets/header-pattern.png)`,
    "--calligraphy-pattern": `url(${basePath}/assets/pattern-calligraphy.png)`,
  } as React.CSSProperties;

  return (
    <html lang="ru" style={cssVars}>
      <body className={`${inter.className} ${playfair.variable}`}>{children}</body>
    </html>
  );
}
