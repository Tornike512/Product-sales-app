import { createStore, Action } from "redux";

export interface AppState {
  currentCategory: string;
  sort: string;
  term: string;
  searchKey: string;
  addToCart: string[];
}

export const CATEGORY = "CATEGORY";
export const SORT = "SORT";
export const TERM = "TERM";
export const SEARCH_KEY = "SEARCH_KEY";
export const ADD_TO_CART = "ADD_TO_CART";

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
interface ADD_TO_CART extends Action<typeof ADD_TO_CART> {
  payload: string[];
}

export type AppAction =
  | IncrementAction
  | SORT
  | TERM
  | SEARCH_KEY
  | ADD_TO_CART;

const initialState: AppState = {
  currentCategory: "",
  sort: "discount-percentage-desc",
  term: "",
  searchKey: "",
  addToCart: [],
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
    case ADD_TO_CART:
      const payloadItems =
        typeof action.payload === "string" ? [action.payload] : action.payload;
      return { ...state, addToCart: [...state.addToCart, ...payloadItems] };
    default:
      return state;
  }
}
const store = createStore(reducer);

export default store;
