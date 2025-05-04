import Card from "@/components/Card/Card";

import "./global.css";

export default function Home() {
  return (
    <>
      <h1>Featured Products</h1>
      <div className="product-grid">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <Card key={num} num={num} />
        ))}
      </div>
    </>
  );
}
