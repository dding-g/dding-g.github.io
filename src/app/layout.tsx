import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { ApolloWrapper } from "@/lib/apollo-wrapper";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "DDing Blog",
    template: "%s | DDing Blog",
  },
  description: "개발과 일상을 기록하는 블로그",
  openGraph: {
    title: "DDing Blog",
    description: "개발과 일상을 기록하는 블로그",
    url: "https://your-domain.com",
    siteName: "DDing Blog",
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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ApolloWrapper>
            <div className="flex flex-col min-h-screen">
              <header className="container z-40 bg-background">
                <div className="flex items-center justify-between h-20 py-6">
                  <MainNav />
                  <ModeToggle />
                </div>
              </header>
              <main className="flex-1">{children}</main>
            </div>
          </ApolloWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
