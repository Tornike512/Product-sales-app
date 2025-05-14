import "../CartPopUp/CartPopUp.css";

export default function CartPopUp() {
  return (
    <div className="toasts-container">
      <div className="toast">
        <div className="toast-icon">✓</div>
        <div className="toast-content">
          <h3 className="toast-title">Success</h3>
          <p className="toast-message">
            Your changes have been saved successfully!
          </p>
        </div>
        <div className="toast-progress"></div>
      </div>
    </div>
  );
}
