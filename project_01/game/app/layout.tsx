import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "여울관: 남겨 둔 자리",
  description: "남겨진 기록을 살피고, 서로 다른 증언을 대조하는 미스터리 게임.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
