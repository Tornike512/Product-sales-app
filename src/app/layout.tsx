import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { ReduxProvider } from "@/components/Providers/Providers";
import { Suspense } from "react";

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
          <Header />
          <main>
            <Suspense fallback={<div>Loading sidebar...</div>}>
              <Sidebar />
            </Suspense>
            <section className="product-container">{children}</section>
          </main>

          <footer>
            <p>&copy; 2025 SaleStores. All rights reserved.</p>
          </footer>
        </ReduxProvider>
      </body>
    </html>
  );
}
