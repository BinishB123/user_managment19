import { useEffect, useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { register, reset } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "./spinner";
import SignUpValidation from "../reducers/validationReducer";
import { addUser } from "../features/adminSlice";

function CreateUser() {
  console.log("okk fine");
  const [state, validDispatch] = useReducer(SignUpValidation, {
    name: true,
    emailid: true,
    password: true,
    mobile: true,
  });
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    emailid: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, isloading, message } = useSelector(
    (state) => state.auth
  );
  //check if the user
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // if (isSuccess || user) {
    //   navigate("/profile");
    // }
    dispatch(reset());
  }, [user, isError, isSuccess, isloading, message]);

  const Onchange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const { name, mobile, emailid, password } = formData;

  // submitting userdatas
  const onClick = () => {
    let checker = true;

    // Validate Name

    const isValidName = /^[A-Za-z]+$/.test(name.split(" ").join(""));
    if (name.trim() === "" || !isValidName) {
      validDispatch({ type: "name", valid: false });
      setTimeout(() => {
        validDispatch({ type: "name", valid: true });
      }, 3000);
      checker = false;
    } else {
      validDispatch({ type: "name", valid: true });
    }

    // Validate Mobile
    const isNumeric = /^[6-9]\d{9}$/.test(mobile.trim());
    const isValidLength = mobile.trim().length === 10;

    if (mobile.trim() === "" || !isNumeric || !isValidLength) {
      validDispatch({ type: "mobile", valid: false });
      setTimeout(() => {
        validDispatch({ type: "mobile", valid: true });
      }, 3000);
      checker = false;
    } else {
      validDispatch({ type: "mobile", valid: true });
    }

    // Validate Email
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailid.trim());
    if (emailid.trim() === "" || !isValidEmail) {
      validDispatch({ type: "emailid", valid: false });
      setTimeout(() => {
        validDispatch({ type: "emailid", valid: true });
      }, 3000);
      checker = false;
    } else {
      validDispatch({ type: "emailid", valid: true });
    }

    // Validate Password
    if (!password.trim()) {
      validDispatch({ type: "password", valid: false });
      setTimeout(() => {
        validDispatch({ type: "password", valid: true });
      }, 3000);
      checker = false;
    } else {
      validDispatch({ type: "password", valid: true });
    }

    // Submit Form Data
    if (checker) {
      const userData = {
        name,
        mobile,
        password,
        emailid,
      };
      dispatch(addUser(userData));
      navigate('/adminHome',{replace:true})
    }
  }; 


  return (
    <>
      <div className="flex flex-col  md:flex-row md:justify-between h-[775px] bg-gradient-to-l from-white via-[#d6d8d9] to-[#919191]">
        <div className=" w-[100%]   md:w-[50%] h-[100px]  flex justify-center">
          <h1 className="mt-[40px] md:mt-[250px] text-4xl md:text-6xl font-mono  font-extrabold ">
            <i class="ri-user-add-line mt-[40px] md:mt-[250px] text-4xl md:text-6xl font-mono  font-extrabold "></i>{" "}
            CreateUser
          </h1>
        </div>
       <div className=" flex items-center justify-center w-[100%]    md:w-[50%] h-[775px]  ">
          <div className="w-[80%] md:w-[60%] md:mt-4 bg-gray-300 h-[80%] md:h-[70%] flex flex-col justify-center items-center space-y-4 border shadow-lg  rounded">
            <input
              name="name"
              value={name}
              className="w-[80%] h-[50px] rounded-sm border shadow-lg text-center"
              placeholder=" Name"
              onChange={Onchange}
            ></input>
            {!state.name && (
              <p className="text-md font-medium text-red-600">
                {state.nameerror}
              </p>
            )}
            <input
              name="mobile"
              className="w-[80%] h-[50px] rounded-sm border shadow-lg text-center"
              placeholder=" Mobile"
              value={mobile}
              onChange={Onchange}
            ></input>
            {!state.mobile && (
              <p className="text-md font-medium text-red-600">
                {state.mobileerror}
              </p>
            )}
            <input
              name="emailid"
              value={emailid}
              className="w-[80%] h-[50px] rounded-sm border shadow-lg text-center"
              placeholder=" EmailId"
              onChange={Onchange}
            ></input>
            {!state.emailid && (
              <p className="text-md font-medium text-red-600">
                {state.emailerror}
              </p>
            )}
            <input
              name="password"
              type="password"
              value={password}
              className="w-[80%] h-[50px] rounded-sm border shadow-lg text-center"
              placeholder="  Password"
              onChange={Onchange}
            ></input>
            {!state.password && (
              <p className="text-md font-medium text-red-600">
                {state.passworderror}
              </p>
            )}
            <div className="w-[80%] flex flex-row justify-between">
              <button
                className="text-xl w-[48%] bg-gray-800 text-white rounded-md h-[50px]"
                type="submit"
                onClick={onClick}
              >
                Create
              </button>
              <button
                className="text-xl w-[48%] bg-red-600 text-white rounded-md h-[50px]"
                
                onClick={()=>{
                   navigate('/adminHome',{replace:true})
                }}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateUser;
