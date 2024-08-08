import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginValidation } from "../reducers/validationReducer";
import { login } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginPage() {
 
  const [state, validDispatch] = useReducer(LoginValidation,{emailid:false,password:false});
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (message==='you are blocked') {
      toast.error(message)
    }
    if (user) {
      navigate('/profile') 
    }
  }, [user, isError, isSuccess, isLoading, message]);
  const { email, password } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const toSignUp = () => {
    navigate("/signup");
  };

  const onClick = () => {
    let checker = true;

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (email.trim() === "" || !isValidEmail) {
      validDispatch({ type: "emailid", valid: false });
      checker = false;
    } else {
      validDispatch({ type: "emailid", valid: true });
    }

    // Validate Password
    if (!password.trim()) {
      validDispatch({ type: "password", valid: false });
      checker = false;
    } else {
      validDispatch({ type: "password", valid: true });
    }

    if (checker) {
      const user = {
        emailid: email,
        password: password,
      };
      dispatch(login(user));
    }
  };

  return (
    <>
    
      <div className="flex flex-col-reverse  md:flex-row md:justify-between h-[775px] bg-gradient-to-l from-white via-[#d6d8d9] to-[#919191]">
        <div className=" w-[100%]   md:w-[50%] h-[775px]  flex justify-center">
          <h1 className="mt-[40px] md:mt-[250px] text-4xl md:text-6xl font-mono  font-extrabold">
            User Managment Login
          </h1>
        </div>
        <div className=" flex items-center justify-center w-[100%]    md:w-[50%] h-[775px]  ">
          <div className="w-[80%] md:w-[60%] bg-gray-300 h-[70%] md:h-[50%] flex flex-col justify-center items-center space-y-4 border shadow-lg  rounded">
            <input
              value={email}
              name="email"
              className="w-[80%] h-[50px] rounded-sm border shadow-lg text-center"
              placeholder="Enter Your Email"
              onChange={onChange}
            ></input>
            {!state.emailid && (
              <p className="text-md font-medium text-red-600">
                {state.emailerror}
              </p>
            )}
            <input
              value={password}
              name="password"
              className="w-[80%] h-[50px] rounded-sm border shadow-lg text-center"
              placeholder="  Enter Your Password"
              onChange={onChange}
              type="password"
            ></input>
             {!state.password && (
              <p className="text-md font-medium text-red-600">
                {state.passworderror}
              </p>
            )}
            <button
              className="text-xl w-[80%] bg-gray-800 text-white rounded-md h-[50px]"
              type="submit"
              onClick={onClick}
            >
              Sign in
            </button>
            <a onClick={toSignUp} className="cursor-pointer">Create an Account</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
