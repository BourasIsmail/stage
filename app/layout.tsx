import type { Metadata } from "next";
import { Inter, Rubik } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "./components/ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });
const font = Rubik({
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "تسجيل المتدربين",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <html lang="ar" dir="rtl">
        <body className={font.className}>
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </ReactQueryProvider>
  );
}
