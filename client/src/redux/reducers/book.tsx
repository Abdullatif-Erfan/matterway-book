import { Action } from "../action-types/actions";
import { ActionType } from "../action-types/types";

export interface bookstate {
  books?: string[];
  loading: boolean;
  error?: {};
}

const initialState = {
  books: [],
  loading: true,
  error: {}
};

function book(state: bookstate = initialState, action: Action) {
  const { type, payload } = action;

  switch (type) {
    case ActionType.GET_BOOKS:
      return {
        ...state,
        books: payload,
        loading: false
      };
    case ActionType.ERROR_BOOKS:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
export default book;
