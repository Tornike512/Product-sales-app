import { createStore, Action } from "redux";

export interface AppState {
  currentCategory: string;
  sort: string;
  term: string;
  searchKey: string;
  showToast: boolean;
  updateCart: number;
}

export const CATEGORY = "CATEGORY";
export const SORT = "SORT";
export const TERM = "TERM";
export const SEARCH_KEY = "SEARCH_KEY";
export const SHOW_TOAST = "SHOW_TOAST";
export const UPDATE_CART = "UPDATE_CART";

interface IncrementAction extends Action<typeof CATEGORY> {
  payload: string;
}
interface SORT extends Action<typeof SORT> {
  payload: string;
}
interface TERM extends Action<typeof TERM> {
  payload: string;
}
interface SEARCH_KEY extends Action<typeof SEARCH_KEY> {
  payload: string;
}
interface SHOW_TOAST extends Action<typeof SHOW_TOAST> {
  payload: boolean;
}
interface UPDATE_CART extends Action<typeof UPDATE_CART> {
  payload: number;
}

export type AppAction =
  | IncrementAction
  | SORT
  | TERM
  | SEARCH_KEY
  | SHOW_TOAST
  | UPDATE_CART;

const initialState: AppState = {
  currentCategory: "",
  sort: "discount-percentage-desc",
  term: "",
  searchKey: "",
  showToast: false,
  updateCart: 0,
};

function reducer(state = initialState, action: AppAction): AppState {
  switch (action.type) {
    case CATEGORY:
      return { ...state, currentCategory: action.payload };
    case SORT:
      return { ...state, sort: action.payload };
    case TERM:
      return { ...state, term: action.payload };
    case SEARCH_KEY:
      return { ...state, searchKey: action.payload };
    case SHOW_TOAST:
      return { ...state, showToast: action.payload };
    case UPDATE_CART:
      return { ...state, updateCart: state.updateCart + 1 };
    default:
      return state;
  }
}
const store = createStore(reducer);

export default store;
