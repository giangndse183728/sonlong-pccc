import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sơn Long PCCC - Thiết bị Phòng Cháy Chữa Cháy Chính Hãng",
  description:
    "Sơn Long PCCC - Chuyên cung cấp thiết bị phòng cháy chữa cháy chính hãng, dịch vụ thi công lắp đặt và bảo trì hệ thống PCCC. Hotline: 0901 234 567",
  keywords: [
    "PCCC",
    "phòng cháy chữa cháy",
    "bình chữa cháy",
    "báo cháy",
    "sprinkler",
    "thiết bị PCCC",
    "Sơn Long PCCC",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
