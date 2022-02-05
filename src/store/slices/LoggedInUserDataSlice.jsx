import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import petDataService from "../../api/petDataServices";

const initialState = [];
export const loggedInUser = createAsyncThunk("/dashboard", async () => {
  const res = await petDataService.loginCheck();
  return res.data;
});

export const login = createAsyncThunk("/signin", async (body) => {
  const res = await petDataService.login(body);
  return res.data;
});

export const updatePassword = createAsyncThunk("/updatepassword", async (body) => {
  const res = await petDataService.updatePassword(body);
  return res.data;
});

export const updateLocation = createAsyncThunk("/updatelocation", async (body) => {
  const res = await petDataService.updateLocation(body);
  return res.data;
});

const loggedInUserSlice = createSlice({
  name: "loggedInUser",
  initialState,
  reducers: {},
  extraReducers: {
    [loggedInUser.fulfilled]: (state, action) => {
      return action.payload;
    },
    [login.fulfilled]: (state, action) => {
      return action.payload;
    },
    [updatePassword.fulfilled]: (state, action) => {
      return action.payload;
    },
    [updateLocation.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export default loggedInUserSlice.reducer;
