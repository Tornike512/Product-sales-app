import "./Sidebar.css";

export default function Sidebar() {
  return (
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
  );
}
