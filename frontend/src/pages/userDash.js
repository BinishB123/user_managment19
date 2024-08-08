import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset, updateUser } from "../features/authSlice";
import { useEffect, useReducer, useRef, useState } from "react";
import { userUpdate } from "../reducers/updateReducer";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../config/firebaseConfig";
import { usereditValidation } from "../reducers/validationReducer";
import { toast } from "react-toastify";

function UserDash() {
  const [edit, editState] = useState(false);
  const fileInputRef = useRef(null);
  const [errorstate, errorDispatch] = useReducer(usereditValidation, {
    name: true,
    emailid: true,
    mobile: true,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, isloading, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    if (message === "Updated successfully") {
      toast.success(message);
    }
    
    if (message === "you are blocked") {
      dispatch(logout());
      navigate("/");
      dispatch(reset());
    }
  }, [user, isError, isSuccess, isloading, message]);

  const [state, editDispatch] = useReducer(userUpdate, {
    name: user?.user?.name || "",
    emailid: user?.user?.email || "",
    mobile: user?.user?.mobile || "",
    image: user?.user?.image || null,
  });
  console.log(state);

  const update = async () => {
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
      if (state.image === user.user.image) {
        const userData = {
          id: user?.user?.id,
          name: state.name,
          mobile: state.mobile,
          emailid: state.emailid,
        };
        dispatch(updateUser(userData));
        editState(!edit);
      } else {
        // Handle image upload

        const userData = {
          id: user?.user?.id,
          name: state.name,
          mobile: state.mobile,
          emailid: state.emailid,
          image: state.image,
        };
       
        dispatch(updateUser(userData));
        editState(!edit);
      }
    }
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    dispatch(reset());
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(
        storage,
        `userImages/${user?.user?.id}/${file.name}`
      );
      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        editDispatch({ type: "image", value: downloadURL });
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image");
      }
    }
  };

  const triggerInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-[100%] h-[100%] bg-gradient-to-l from-white via-[#d6d8d9] to-[#919191]">
      <nav className="flex justify-end h-[90px] items-center w-[100%]">
        <div className="w-[100%] md:w-[70%] flex justify-start ml-5 md:ml-0">
          <h1 className="text-4xl font-sans font-semibold">
            {user?.user?.name
              ? `DashBoard Hiii ${user.user.name} !!!`
              : "Loading..."}
          </h1>
        </div>
        <div className="hidden md:flex justify-end md:w-[20%]">
          <button
            className="w-[60%] bg-slate-500 h-[40px] rounded-md text-white mr-9"
            onClick={handleLogout}
          >
            logOut
          </button>
        </div>
      </nav>
      <div className="w-[100%] h-[680px] flex justify-center items-center">
        {!edit && user?.user && (
          <div className="w-[80%] md:w-[40%] h-[600px] shadow-2xl rounded-md flex flex-col space-y-6">
            <div className="flex flex-row justify-end h-[10%]">
              <i
                className="ri-edit-box-line mr-9 mt-2 font-4xl font-black font-sans flex-row cursor-pointer"
                onClick={() => editState(!edit)}
              >
                EDIT
              </i>
            </div>
            <div className="flex justify-center h-[40%] mt-3">
              <img
                className="w-[50%] md:w-[30%] rounded-[100px] h-[200px] shadow-2xl object-cover"
                src={
                  user?.user?.image
                    ? user.user.image
                    : "https://as1.ftcdn.net/v2/jpg/05/11/52/90/1000_F_511529094_PISGWTmlfmBu1g4nocqdVKaHBnzMDWrN.jpg"
                }
                // alt="User Avatar"
              />
            </div>
            <div className="w-[100%] flex flex-col">
              <h5 className="font-mono font-semibold text-lg">
                {user.user.name}
              </h5>
              <h5 className="font-sans font-black">{user.user.mobile}</h5>
              <h5 className="font-mono font-extrabold text-lg">
                {user.user.email}
              </h5>
              <div className="md:hidden flex justify-center md:w-[20%] mt-20">
                <button className="w-[60%] bg-slate-500 h-[40px] rounded-md text-white">
                  logOut
                </button>
              </div>
            </div>
          </div>
        )}
        {edit && (
          <div className="w-[80%] md:w-[40%] h-[590px] shadow-2xl rounded-md flex flex-col space-y-6">
            <div className="flex justify-center h-[40%] mt-3">
              <img
                className="w-[50%] md:w-[30%] rounded-[100px] h-[200px] shadow-2xl object-cover"
                src={
                  state.image
                    ? state.image
                    : "https://as1.ftcdn.net/v2/jpg/05/11/52/90/1000_F_511529094_PISGWTmlfmBu1g4nocqdVKaHBnzMDWrN.jpg"
                }
              />
              <i
                className="ri-camera-fill bg-transparent pt-40 text-4xl rounded-full cursor-pointer -translate-x-14 z-30"
                onClick={triggerInput}
              ></i>
              <input
                type="file"
                className="hidden"
                accept="image/png, image/jpeg"
                ref={fileInputRef}
                onChange={handleFileInputChange}
              />
            </div>
            <div className="w-[100%] flex flex-col space-y-3 items-center">
              <div className="w-[100%]">
                <input
                  className="w-[60%] h-[40px] rounded-sm border shadow-lg text-center"
                  placeholder="Name"
                  value={state.name}
                  onChange={(e) =>
                    editDispatch({ type: "name", value: e.target.value })
                  }
                />
                {!errorstate.name && (
                  <p className="text-md font-medium text-red-600">
                    {errorstate.nameerror}
                  </p>
                )}
              </div>
              <div className="w-[100%]">
                <input
                  className="w-[60%] h-[40px] rounded-sm border shadow-lg text-center"
                  placeholder="mobile"
                  value={state.mobile}
                  onChange={(e) =>
                    editDispatch({ type: "mobile", value: e.target.value })
                  }
                />
                {!errorstate.mobile && (
                  <p className="text-md font-medium text-red-600">
                    {errorstate.mobileerror}
                  </p>
                )}
              </div>
              <div className="w-[100%]">
                <input
                  className="w-[60%] h-[40px] rounded-sm border shadow-lg text-center"
                  placeholder="email id"
                  value={state.emailid}
                  onChange={(e) =>
                    editDispatch({ type: "email", value: e.target.value })
                  }
                />
                {!errorstate.emailid && (
                  <p className="text-md font-medium text-red-600">
                    {errorstate.emailerror}
                  </p>
                )}
              </div>
              <div className="w-[100%] flex flex-col items-center md:flex-row md:justify-around md:w-[70%] mt-20">
                <button
                  className="w-[40%] h-[40px] bg-green-600 mt-2 md:mt-0 rounded-md text-white cursor-pointer"
                  onClick={update}
                >
                  Save
                </button>
                <button
                  className="w-[40%] h-[40px] bg-red-600 mt-2 md:mt-0 rounded-md text-white"
                  onClick={() => editState(!edit)}
                >
                  Cancel
                </button>
              </div>
              <div className="w-[100%] md:hidden flex justify-center md:w-[20%]">
                <button className="w-[60%] bg-slate-500 h-[40px] rounded-md text-white">
                  logOut
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDash;
