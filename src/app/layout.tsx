import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lộ trình tập · 75 → 70kg",
  description:
    "Lịch tập hằng ngày (khởi động, bài tập, giãn cơ) và thực đơn cho mục tiêu 75 → 70kg.",
  openGraph: {
    title: "Lộ trình tập · 75 → 70kg",
    description:
      "Garage gym roadmap: dây kháng lực, xà, tạ 3kg, dây nhảy — giảm 75→70kg rồi duy trì.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${figtree.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
