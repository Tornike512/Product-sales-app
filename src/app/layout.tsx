// RootLayout.tsx
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
      <head>
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Arial', sans-serif;
          }
          
          body {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background-color: #f5f5f5;
          }
          
          header {
            background-color: #333;
            color: white;
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .logo {
            font-size: 1.5rem;
            font-weight: bold;
          }
          
          .search-container {
            width: 50%;
            max-width: 500px;
            display: flex;
          }
          
          .search-container input {
            padding: 0.5rem;
            flex: 1;
            border: none;
            border-radius: 4px 0 0 4px;
          }
          
          .search-container button {
            padding: 0.5rem 1rem;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 0 4px 4px 0;
            cursor: pointer;
          }
          
          main {
            display: flex;
            flex: 1;
          }
          
          .sidebar {
            width: 250px;
            background-color: white;
            padding: 1rem;
            box-shadow: 2px 0 5px rgba(0,0,0,0.1);
          }
          
          .category-list {
            list-style-type: none;
          }
          
          .category-list li {
            padding: 0.75rem 0;
            border-bottom: 1px solid #eee;
          }
          
          .category-list li:last-child {
            border-bottom: none;
          }
          
          .category-list a {
            text-decoration: none;
            color: #333;
            display: block;
            transition: color 0.3s;
          }
          
          .category-list a:hover {
            color: #4CAF50;
          }
          
          .product-container {
            flex: 1;
            padding: 2rem;
          }
          
          .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 2rem;
          }
          
          .product-card {
            background-color: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            transition: transform 0.3s, box-shadow 0.3s;
          }
          
          .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          }
          
          .product-image {
            height: 200px;
            width: 100%;
            background-color: #eee;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .product-info {
            padding: 1rem;
          }
          
          .product-title {
            font-weight: bold;
            margin-bottom: 0.5rem;
          }
          
          .product-price {
            color: #4CAF50;
            font-weight: bold;
          }
          
          footer {
            background-color: #333;
            color: white;
            text-align: center;
            padding: 1rem;
          }
          
          @media (max-width: 768px) {
            main {
              flex-direction: column;
            }
            
            .sidebar {
              width: 100%;
              box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            
            .search-container {
              width: 100%;
            }
          }
        `}</style>
      </head>
      <body>
        <header>
          <div className="logo">MyShop</div>
          <div className="search-container">
            <input type="text" placeholder="Search products..." />
            <button>Search</button>
          </div>
        </header>

        <main>
          <aside className="sidebar">
            <h2>Categories</h2>
            <ul className="category-list">
              <li>
                <a href="#">Electronics</a>
              </li>
              <li>
                <a href="#">Clothing</a>
              </li>
              <li>
                <a href="#">Home & Garden</a>
              </li>
              <li>
                <a href="#">Sports & Outdoors</a>
              </li>
              <li>
                <a href="#">Beauty & Personal Care</a>
              </li>
              <li>
                <a href="#">Toys & Games</a>
              </li>
              <li>
                <a href="#">Books</a>
              </li>
              <li>
                <a href="#">Automotive</a>
              </li>
              <li>
                <a href="#">Jewelry</a>
              </li>
              <li>
                <a href="#">Office Supplies</a>
              </li>
            </ul>
          </aside>

          <section className="product-container">{children}</section>
        </main>

        <footer>
          <p>&copy; 2025 MyShop. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
