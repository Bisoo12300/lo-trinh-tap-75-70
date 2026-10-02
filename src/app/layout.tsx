import type { Metadata } from "next";
import { Barlow_Condensed, Figtree } from "next/font/google";
import "./globals.css";

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700", "800"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lộ trình tập · 75 → 70kg",
  description:
    "Lộ trình giảm cân và duy trì với dây kháng lực, xà ngang, tạ 3kg và dây nhảy.",
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
    <html lang="vi" className={`${barlow.variable} ${figtree.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
