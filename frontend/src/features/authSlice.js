import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";


// get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const intialState = {
  user: user ? user : null,
  isError: false,         
  isSuccess: false,
  isloading: false,
  message: "",
};
//register user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkapi) => {
    try {
      // console.log("in thunk");
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkapi.rejectWithValue(message);
    }
  }
);
//login
export const login = createAsyncThunk("auth/login", async (user, thunkapi) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.message && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkapi.rejectWithValue(message);
  }
});

export const updateUser = createAsyncThunk(
  "auth/update",
  async (user, thunkapi) => {
    try {
      const response = await authService.updateUser(user);
      console.log("resp",response);
      return response
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkapi.rejectWithValue(message);
    }
  }
);

//loguout user
export const logout = createAsyncThunk("auth/logout", async () => {
  return await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState: intialState,
  reducers: {
    reset: (state) => {
      state.isloading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isloading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isloading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isloading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isloading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isloading = false;
        state.isSuccess = true; 
        state.isError = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isloading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.isloading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isloading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
        state.message = action.payload.message
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isloading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
      });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
