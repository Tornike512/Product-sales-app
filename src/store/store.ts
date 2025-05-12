import { createStore, Action } from "redux";

export interface AppState {
  currentCategory: string;
  sort: string;
  term: string;
  searchKey: string;
}

export const CATEGORY = "CATEGORY";
export const SORT = "SORT";
export const TERM = "TERM";
export const SEARCH_KEY = "SEARCH_KEY";

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

export type AppAction = IncrementAction | SORT | TERM | SEARCH_KEY;

const initialState: AppState = {
  currentCategory: "",
  sort: "discount-percentage-desc",
  term: "",
  searchKey: "",
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
    default:
      return state;
  }
}
const store = createStore(reducer);

export default store;
