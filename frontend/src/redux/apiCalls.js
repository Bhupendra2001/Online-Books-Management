import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutSuccess,
} from "./userRedux";

import { getBookSuccess, getBooksFailure, getBooksStart } from "./bookRedux";

import axios from "axios";


export const login = async (dispatch, user, nevigate , setError) => {
  dispatch(loginStart());

  try {
    const res = await axios.post("https://books-management-nine.vercel.app/api/login", user);
    dispatch(loginSuccess(res.data));
    nevigate("/");
  } catch (err) {
    dispatch(loginFailure());
    setError(err.response.data.message)
   
  }
};

export const logout = (dispatch, nevigate) => {
  dispatch(logoutSuccess());
  nevigate("/login");
};

export const GetBooks = async (dispatch) => {
  dispatch(getBooksStart());

  try {
    const res = await axios.get("https://books-management-nine.vercel.app/api/getAllbooks");
    dispatch(getBookSuccess(res.data.data));
  } catch (err) {
    dispatch(getBooksFailure());
  }
};

