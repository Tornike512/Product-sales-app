import { useDispatch } from "react-redux";
import { SHOW_TOAST } from "@/store/store";

import "../CartPopUp/CartPopUp.css";

export default function CartPopUp() {
  const dispatch = useDispatch();

  const handleCloseToastButton = () => {
    dispatch({ type: SHOW_TOAST, payload: false });
  };

  return (
    <div className="toast-container">
      <div id="toast">
        <p>Product added successfully</p>
        <button onClick={handleCloseToastButton}>×</button>
      </div>
      <div id="toast">
        <p>Product added successfully</p>
        <button onClick={handleCloseToastButton}>×</button>
      </div>
      <div id="toast">
        <p>Product added successfully</p>
        <button onClick={handleCloseToastButton}>×</button>
      </div>
    </div>
  );
}
