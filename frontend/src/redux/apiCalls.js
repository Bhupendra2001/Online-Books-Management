import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutSuccess,
} from "./userRedux";
import { getBookSuccess, getBooksFailure, getBooksStart } from "./bookRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user, nevigate , setError) => {
  dispatch(loginStart());

  try {
    const res = await publicRequest.post("/login", user);
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
    const res = await publicRequest.get("/getAllbooks");
    dispatch(getBookSuccess(res.data.data));
  } catch (err) {
    dispatch(getBooksFailure());
  }
};

