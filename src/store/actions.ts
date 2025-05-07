import { INCREMENT, DECREMENT, AppAction } from "./store";

export function increment(): AppAction {
  return { type: INCREMENT };
}

export function decrement(): AppAction {
  return { type: DECREMENT };
}
