import type { Metadata } from "next";
import { JetBrains_Mono as JetBrainsMono } from "next/font/google";

import "./globals.css";

const jetBrainsMono = JetBrainsMono({
  subsets: ["latin"],
  display: "block",
});

export const metadata: Metadata = {
  title: "undownloadable",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
    <body className={jetBrainsMono.className}>{children}</body>
  </html>
);

export default RootLayout;
