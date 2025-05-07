import { createStore, Action } from "redux";

export interface AppState {
  currentCategory: string;
  sort: string;
}

export const CATEGORY = "CATEGORY";
export const SORT = "SORT";

interface IncrementAction extends Action<typeof CATEGORY> {
  payload: string;
}
interface SORT extends Action<typeof SORT> {
  payload: string;
}

export type AppAction = IncrementAction | SORT;

const initialState: AppState = {
  currentCategory: "fish",
  sort: "price-asc",
};

function reducer(state = initialState, action: AppAction): AppState {
  switch (action.type) {
    case CATEGORY:
      return { ...state, currentCategory: action.payload };
    case SORT:
      console.log(state);

      return { ...state, sort: action.payload };
    default:
      return state;
  }
}
const store = createStore(reducer);

export default store;
