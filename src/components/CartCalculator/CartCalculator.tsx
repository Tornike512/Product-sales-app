import { useGetCartProducts } from "@/hooks/useGetCartProducts";

import "./CartCalculator.css";

export default function ItemPriceCalculator() {
  const { cartProducts } = useGetCartProducts();

  const totalSum =
    Array.isArray(cartProducts) &&
    cartProducts.reduce(
      (sum, product) => sum + (Number(product.price) || 0),
      0
    );

  const totalOldPriceSum =
    Array.isArray(cartProducts) &&
    cartProducts.reduce(
      (sum, product) => sum + (Number(product.oldPrice) || 0),
      0
    );

  return (
    <div className="calculator-container">
      <h2>Products Price Calculator</h2>

      <div className="summary-section">
        <div className="summary-item">
          <span className="label">
            Quantity of Items: {cartProducts?.length}
          </span>
          <span className="value"></span>
        </div>
      </div>

      <div className="items-section">
        <h3>Price per Item</h3>
        <ul className="items-list">
          {cartProducts?.map((product, index) => {
            return (
              <li key={index} className="item">
                <span className="item-name">{product.productName}</span>
                <span className="item-price">
                  <span>{Number(product.price).toFixed(2)} ₾</span>
                  <span>{Number(product.oldPrice).toFixed(2)} ₾</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="total-section">
        <div className="total-row">
          <span className="total-label">Total Saved:</span>
          <span className="total-value">
            <span>{Number(totalSum).toFixed(2)} ₾</span>
            <span>{Number(totalOldPriceSum).toFixed(2)} ₾</span>
          </span>
        </div>
      </div>
    </div>
  );
}
