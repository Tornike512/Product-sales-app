import { createStore, Action } from "redux";

export interface AppState {
  currentCategory: string;
  sort: string;
  term: string;
}

export const CATEGORY = "CATEGORY";
export const SORT = "SORT";
export const TERM = "TERM";

interface IncrementAction extends Action<typeof CATEGORY> {
  payload: string;
}
interface SORT extends Action<typeof SORT> {
  payload: string;
}
interface TERM extends Action<typeof TERM> {
  payload: string;
}

export type AppAction = IncrementAction | SORT | TERM;

const initialState: AppState = {
  currentCategory: "",
  sort: "discount-percentage-desc",
  term: "",
};

function reducer(state = initialState, action: AppAction): AppState {
  switch (action.type) {
    case CATEGORY:
      return { ...state, currentCategory: action.payload };
    case SORT:
      return { ...state, sort: action.payload };
    case TERM:
      return { ...state, term: action.payload };
    default:
      return state;
  }
}
const store = createStore(reducer);

export default store;
