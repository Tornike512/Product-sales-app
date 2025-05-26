import { useDispatch } from "react-redux";
import { AppState, TOASTS } from "@/store/store";
import { useSelector } from "react-redux";

import "../CartPopUp/CartPopUp.css";

export default function CartPopUp() {
  const dispatch = useDispatch();

  const toasts = useSelector((state: AppState) => {
    return state.toasts;
  });

  const handleCloseToastButton = () => {
    dispatch({ type: TOASTS, payload: true });
  };
  console.log(toasts);

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        return (
          <div key={toast.id} id="toast">
            <p>{toast.title}</p>
            <button onClick={handleCloseToastButton}>×</button>
          </div>
        );
      })}
    </div>
  );
}
