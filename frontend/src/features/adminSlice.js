import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "./adminService";
import { json } from "react-router-dom";

const admin = JSON.parse(localStorage.getItem("admin"));
const initialState = {
  admin: admin ? admin : null,
  user: admin?.user ? admin.user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const updateAdminData = createAsyncThunk(
  "admin/updateAdminData",
  async (admin, thunkApi) => {
    try {
      return await adminService.updateAdminData();
    } catch (error) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const adminUpdateUser = createAsyncThunk(
  "admin/AdminUpdateUser",
  async (userData, thunkApi) => {
    try {
      return await adminService.adminUpdateUser(userData);
    } catch (error) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const blockUnblock = createAsyncThunk(
  "admin/blockUnblock",
  async (userid, thunkApi) => {
    try {
      return await adminService.blockUnblock(userid);
    } catch (error) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const adminLogin = createAsyncThunk(
  "admin/getHome",
  async (adminData, thunkApi) => {
    try {
      const response = await adminService.adminLogin(adminData);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const addUser = createAsyncThunk(
  "admin/adduser",
  async (newUser, thunkApi) => {
    try {
      const response = await adminService.addUser(newUser);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const searchedUser = createAsyncThunk(
  "admin/searchedUser",
  async (searchTerm, thunkApi) => {
    try {
      const response = await adminService.searchedUser(searchTerm)
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const adminLogout = createAsyncThunk("admin/logout", async () => {
  return await adminService.adminLogout();
});

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    resetMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.message = "";
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload.user;
        state.admin = action.payload;
        localStorage.setItem("admin", JSON.stringify(action.payload));
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(adminLogout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.admin = null;
        state.user = null;
        state.message = "";
      })
      .addCase(updateAdminData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAdminData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload.user;
        state.admin = action.payload;
        localStorage.setItem("admin", JSON.stringify(action.payload));
      })
      .addCase(updateAdminData.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        console.log("updateAdminData.rejected:", action.payload);
      })
      .addCase(adminUpdateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminUpdateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(adminUpdateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(blockUnblock.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(blockUnblock.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        const user = JSON.parse(localStorage.getItem("admin"));
        state.user = user.user;
      })
      .addCase(blockUnblock.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      }).addCase(searchedUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchedUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload.users;
        console.log("state,user",state.user);
      })
      .addCase(searchedUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });;
  },
});

export const { reset, resetMessage } = adminSlice.actions;
export default adminSlice.reducer;
