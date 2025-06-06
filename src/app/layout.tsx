import { ReduxProvider } from "@/components/Providers/Providers";
import { Suspense } from "react";

import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import Footer from "@/components/Footer/Footer";
import PreLoadLogo from "@/components/PreLoadLogo/PreLoadLogo";

import "./global.css";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "E-commerce Store",
  description: "E-commerce store with product categories and search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <PreLoadLogo />
          <Header />
          <main>
            <Suspense fallback={<div>Loading sidebar...</div>}>
              <Sidebar />
            </Suspense>
            <section className="product-container">{children}</section>
          </main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
