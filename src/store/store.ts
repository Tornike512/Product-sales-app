import { createStore, Action } from "redux";
import { nanoid } from "nanoid";

export interface IToast {
  id: string;
  title: string;
  show: boolean;
}

export interface AppState {
  currentCategory: string;
  sort: string;
  term: string;
  searchKey: string;
  toasts: IToast[];
  updateCart: number;
  authenticate: boolean;
}

export const CATEGORY = "CATEGORY";
export const SORT = "SORT";
export const TERM = "TERM";
export const SEARCH_KEY = "SEARCH_KEY";
export const TOASTS = "TOASTS";
export const UPDATE_CART = "UPDATE_CART";
export const AUTHENTICATE = "AUTHENTICATE";

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
interface TOASTS extends Action<typeof TOASTS> {
  payload: boolean;
}
interface UPDATE_CART extends Action<typeof UPDATE_CART> {
  payload: number;
}
interface AUTHENTICATE extends Action<typeof AUTHENTICATE> {
  payload: boolean;
}

export type AppAction =
  | IncrementAction
  | SORT
  | TERM
  | SEARCH_KEY
  | TOASTS
  | UPDATE_CART
  | AUTHENTICATE;

const initialState: AppState = {
  currentCategory: "",
  sort: "discount-percentage-desc",
  term: "",
  searchKey: "",
  toasts: [],
  updateCart: 0,
  authenticate: false,
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
    case TOASTS:
      return {
        ...state,
        toasts: [
          ...state.toasts,
          { id: nanoid(), title: "Product added successfully", show: true },
        ],
      };
    case UPDATE_CART:
      return { ...state, updateCart: state.updateCart + 1 };
    case AUTHENTICATE:
      return { ...state, authenticate: action.payload };
    default:
      return state;
  }
}
const store = createStore(reducer);

export default store;
