import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";

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
        <Header />
        <main>
          <Sidebar />
          <section className="product-container">{children}</section>
        </main>

        <footer>
          <p>&copy; 2025 MyShop. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
