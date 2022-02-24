import axiosInstance from "../../utils/axios";
import { ActionType } from "../action-types/types";
import { Action } from "../action-types/actions";
import { Dispatch } from "redux";

// GET Books
export const getBooks = () => async (dispatch: Dispatch<Action>) => {
  try {
    const res = await axiosInstance.get("/books");
    dispatch({
      type: ActionType.GET_BOOKS,
      payload: res.data.records
    });
    // console.log('=================', res.data)
  } catch (err) {
    dispatch({
      type: ActionType.ERROR_BOOKS,
      payload: { message: "getBook method Error", status: err.response.status }
    });
  }
};

// search a book
export const search_a_book = (title: string) => async (
  dispatch: Dispatch<Action>
) => {
  try {
    const res = await axiosInstance.get(`/books/${title}`);
    // console.log('title is : ', title)
  } catch (err) {}
};
