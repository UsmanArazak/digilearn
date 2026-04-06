import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n-provider"; // Using path alias configured by Next

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DigiLearn",
  description: "Learn the digital skills you need to succeed",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#fafafa"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <I18nProvider>
          <div className="max-w-[430px] mx-auto min-h-screen relative shadow-[0_0_40px_rgba(0,0,0,0.05)] sm:border-x sm:border-gray-100 flex flex-col">
            {children}
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
