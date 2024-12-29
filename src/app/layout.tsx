import { Inter } from "next/font/google";
import { MainHeader } from "@/components/main-header";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "dding-g Blog",
    template: "%s | dding-g Blog",
  },
  description: "개발 블로그",
  openGraph: {
    title: "dding-g Blog",
    description: "개발과 일상을 기록하는 블로그",
    url: "https://your-domain.com",
    siteName: "dding-g Blog",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="min-h-screen">
          <MainHeader />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
