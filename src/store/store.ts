import { createStore, Action } from "redux";

export interface AppState {
  currentCategory: string;
}

export const CATEGORY = "CATEGORY";

interface IncrementAction extends Action<typeof CATEGORY> {
  payload: string;
}
export type AppAction = IncrementAction;

const initialState: AppState = {
  currentCategory: "",
};

function reducer(state = initialState, action: AppAction): AppState {
  switch (action.type) {
    case CATEGORY:
      return { ...state, currentCategory: action.payload };
    default:
      return state;
  }
}
const store = createStore(reducer);

export default store;
