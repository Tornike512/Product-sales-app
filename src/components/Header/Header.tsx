import "@/components/Header/Header.css";

export default function Header() {
  return (
    <header>
      <div className="logo">MyShop</div>
      <div className="search-container">
        <input type="text" placeholder="Search products..." />
        <button>Search</button>
      </div>
    </header>
  );
}
