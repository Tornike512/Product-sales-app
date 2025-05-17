import SearchModalProduct from "../SearchModalProduct/SearchModalProduct";

import "../SearchModal/SearchModal.css";

export default function SearchModal() {
  return (
    <div className="search-modal-container">
      <h2 className="search-modal-title">Featured Products</h2>
      <div className="search-modal-grid">
        <SearchModalProduct />
      </div>
      <div className="search-modal-footer">
        <button className="search-modal-view-all">View All Products</button>
      </div>
    </div>
  );
}
