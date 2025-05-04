export default function Home() {
  return (
    <>
      <h1>Featured Products</h1>
      <div className="product-grid">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div key={num} className="product-card">
            <div className="product-image">
              <img
                src="/placeholder.jpg"
                alt={`Product ${num}`}
                width={200}
                height={200}
              />
            </div>
            <div className="product-info">
              <div className="product-title">Product {num}</div>
              <div className="product-price">${(49 + num * 30).toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
