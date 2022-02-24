import { bookDeclarationTypes } from "../action-types/declarations";
import { ActionType } from "./types";

interface getBooksActionTypes {
  type: ActionType.GET_BOOKS;
  payload: bookDeclarationTypes;
}

interface bookErrorActionTypes {
  type: ActionType.ERROR_BOOKS;
  payload: {};
}

export type Action = getBooksActionTypes | bookErrorActionTypes;
