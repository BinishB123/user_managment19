import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import {
  adminLogout,
  adminUpdateUser,
  blockUnblock,
  resetMessage,
  searchedUser,
  updateAdminData,
} from "../features/adminSlice";
import { adminUserUpdate, usereditValidation } from "../reducers/adminReducer";
import { toast } from "react-toastify";

export default function AdminHome() {
  const [search, setSearch] = useState("");
  const [edit, editState] = useState(false);
  const [errorstate, errorDispatch] = useReducer(usereditValidation, {
    name: true,
    emailid: true,
    mobile: true,
  });
  const [id, setId] = useState(null);
  const { admin, user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.adminAuth
  );

  const [state, userEditdispatch] = useReducer(adminUserUpdate, {
    name: "",
    emailid: "",
    mobile: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (message==="user with same email exists") {
      toast.error(message) 
    }
    if (message === "Updated successfully") {
      toast.success(message);
      dispatch(resetMessage());
      return;
    }
    if (admin) {
      dispatch(updateAdminData());
    }
  }, [edit, message]);

  useEffect(() => {
    if (!admin) {
      navigate("/admin");
    }
    if (admin) {
      navigate("/adminHome");
    }
  }, [admin, user, isError, isSuccess, isLoading, message]);
  const logout = () => {
    dispatch(adminLogout());
    navigate("/admin");
  };

  const settinguser = (user) => {
    userEditdispatch({ type: "id", value: user._id });
    userEditdispatch({ type: "name", value: user.name });
    userEditdispatch({ type: "email", value: user.email });
    userEditdispatch({ type: "mobile", value: user.mobile });
  };

  const save = () => {
    let checker = true;
    const isValidName = /^[A-Za-z]+$/.test(state.name.split(" ").join(""));
    if (state.name.trim() === "" || !isValidName) {
      errorDispatch({ type: "name", valid: false });

      checker = false;
    } else {
      errorDispatch({ type: "name", valid: true });
    }

    // Validate Mobile
    const isNumeric = /^[6-9]\d{9}$/.test(state.mobile.toString().trim());
    const isValidLength =
      typeof state.mobile === "string"
        ? state.mobile.trim().length === 10
        : state.mobile.toString().length === 10;
    if (!isNumeric || !isValidLength) {
      errorDispatch({ type: "mobile", valid: false });
      checker = false;
    } else {
      errorDispatch({ type: "mobile", valid: true });
    }

    // Validate Email
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      state.emailid.trim()
    );
    if (state.emailid.trim() === "" || !isValidEmail) {
      errorDispatch({ type: "emailid", valid: false });
      checker = false;
    } else {
      errorDispatch({ type: "emailid", valid: true });
    }

    if (checker) {
      const userData = {
        id: state.id,
        name: state.name,
        mobile: state.mobile,
        emailid: state.emailid,
      };
      console.log("userData",userData);
      dispatch(adminUpdateUser(userData));
      editState(!edit);
      setId(null);
    }
  };

  const handleblockUnblock = (id) => {
    dispatch(blockUnblock(id));
  };
  const searchUser = () => {
    dispatch(searchedUser(search))
  };

  return (
    <div className="bg-gradient-to-l from-white via-[#d6d8d9] to-[#919191] h-[100vh] ">
      <nav className="w-[100%] h-[100px]  flex flex-row justify-evenly items-center">
        <div className=" w-[40%] text-start h-[80px] items-center">
          <h1 className="text-2xl font-mono">AdminHome</h1>
        </div>
        <div className=" w-[30%]  md:w-[40%] justify-end text-end  h-[80px] ">
          <i class=" md:hidden ri-logout-box-r-line text-2xl"></i>
          <button
            className="hidden md:flex justify-center w-[20%] bg-slate-500 h-[40px] items-center rounded-md text-white ml-[400px]"
            onClick={logout}
          >
            logOut
          </button>
        </div>
      </nav>
      {/* search */}
      <div className="w-[100%] md:w-[90%] h-[60px]  flex fle-row justify-center items-center md:justify-end  ">
        <input
          name="search"
          className="w-[80%] md:w-[40%] h-[50px] rounded-md border  shadow-lg text-center "
          placeholder="search with user name ..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></input>
        <button className="border ml-1 rounded-sm" onClick={searchUser}>
          <i class="ri-search-line text-5xl "></i>
        </button>
      </div>
      {/* users */}
      <div className="md:text-start flex flex-row justify-around">
        <div className="w-[32%] text-start">
          <h4 className="text-4xl font-mono font-semibold md:ml-[167px]">
            users
          </h4>
        </div>
        <div className="w-[40%] text-center">
          <i
            class="ri-user-add-line text-2xl font-mono font-semibold cursor-pointer"
            onClick={() => {
              navigate("/createuser");
            }}
          >
            {" "}
            create user
          </i>
        </div>
      </div>

      <div className="w-[90%] md:w-[85%] rounded-md h-[550px] ml-[35px] md:ml-[100px] flex flex-col overflow-y-scroll scrollbar-hide space-y-4 bg-transparent mt-1">
        {user &&
          [...user].reverse().map((user, key) => (
            <div
              key={key}
              className="flex flex-col items-center md:justify-evenly md:flex-row h-[300px] md:h-[100px] hover:bg-gray-300 space-y-2 mt-1 rounded-sm"
            >
              <img
                className="w-[20%] md:w-[6%] rounded-[110px] h-[100px] md:h-[60px] shadow-2xl object-cover"
                src={
                  user?.imgUrl
                    ? user.imgUrl
                    : "https://as1.ftcdn.net/v2/jpg/05/11/52/90/1000_F_511529094_PISGWTmlfmBu1g4nocqdVKaHBnzMDWrN.jpg"
                }
                alt={`${user.name}'s avatar`}
              />
              {!edit || id !== user._id ? (
                <>
                  <h5 className="text-md font-mono font-medium w-[10%]">
                    {user.name}
                  </h5>
                  <h5 className="text-md font-mono font-medium w-[10%]">
                    {user.email}
                  </h5>
                  <h5 className="text-md font-mono font-medium w-[10%]">
                    {user.mobile}
                  </h5>
                </>
              ) : (
                <>
                  <div className="border w-[80%] h-[40px] rounded md:w-[15%]">
                    <input
                      className="border w-[100%] h-[40px] rounded md:w-[100%]"
                      value={state.name}
                      onChange={(e) => {
                        userEditdispatch({
                          type: "name",
                          value: e.target.value,
                        });
                      }}
                    />
                    <p className="text-md font-medium text-red-600"></p>
                  </div>
                  <div className="border w-[80%] h-[40px] rounded md:w-[15%]">
                    <input
                      className="border w-[100%] h-[40px] rounded md:w-[100%]"
                      value={state.emailid}
                      onChange={(e) => {
                        userEditdispatch({
                          type: "email",
                          value: e.target.value,
                        });
                      }}
                    />
                    <p className="text-md font-medium text-red-600"></p>
                  </div>
                  <div className="border w-[80%] h-[40px] rounded md:w-[15%]">
                    <input
                      className="border w-[100%] h-[40px] rounded md:w-[100%]"
                      value={state.mobile}
                      onChange={(e) => {
                        userEditdispatch({
                          type: "mobile",
                          value: e.target.value,
                        });
                      }}
                    />
                    <p className="text-md font-medium text-red-600"></p>
                  </div>
                </>
              )}

              <label
                className={`w-[30%] md:w-[10%] text-md text-white font-semibold rounded-xl ${
                  user.isActive ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {user.isActive ? "Active" : "Inactive"}
              </label>
              <div className="flex flex-col space-y-2 md:flex-row justify-around w-[100%] md:w-[30%] items-center">
                {!edit || id !== user._id ? (
                  <button
                    className="bg-blue-700 w-[30%] md:w-[40%] text-md font-semibold rounded-md text-slate-100 h-[35px]"
                    onClick={() => {
                      setId(user._id);
                      settinguser(user);
                      editState(!edit);
                    }}
                  >
                    EDIT
                  </button>
                ) : (
                  <button
                    className="bg-blue-700 w-[30%] md:w-[40%] text-md font-semibold rounded-md text-slate-100 h-[35px]"
                    onClick={save}
                  >
                    save
                  </button>
                )}

                {!edit || id !== user._id ? (
                  <button
                    className={
                      user.isActive
                        ? "bg-red-600 w-[30%] md:w-[40%] text-md font-semibold rounded-md text-slate-100 h-[35px]"
                        : "bg-green-500 w-[30%] md:w-[40%] text-md font-semibold rounded-md text-slate-100 h-[35px]"
                    }
                    onClick={() => {
                      handleblockUnblock(user._id);
                    }}
                  >
                    {user.isActive ? "Block" : "UnBlock"}
                  </button>
                ) : (
                  <button
                    className="bg-red-600 w-[30%] md:w-[40%] text-md font-semibold rounded-md text-slate-100 h-[35px]"
                    onClick={() => {
                      setId(null);
                      editState(!edit);
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
