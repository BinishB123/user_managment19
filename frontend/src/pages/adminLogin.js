import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { adminLogin, adminRegister } from "../features/adminSlice";
export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const { admin,user,isError,isSuccess,isLoading,message } = useSelector(
    (state) => state.adminAuth
  );
  console.log(admin,user,isError,isSuccess,isLoading,message );
  useEffect(() => {
    if (admin) {
      navigate("/adminhome");
    }
    if (isError) {
      toast.error(message);
    }
  }, [admin, user, isError, isSuccess, isLoading, message]);
  const onClick = () => {
    const adminData = {
      email: email,
      password: email,
    };
    dispatch(adminLogin(adminData));
  };

  return (
    <>
      <div className="flex flex-col-reverse  md:flex-row md:justify-between h-[775px] bg-gradient-to-l from-white via-[#d6d8d9] to-[#919191]">
        <div className=" w-[100%]   md:w-[50%] h-[775px]  flex justify-center">
          <h1 className="mt-[40px] md:mt-[250px] text-4xl md:text-6xl font-mono  font-extrabold">
            AdminLogin
          </h1>
        </div>
        <div className=" flex items-center justify-center w-[100%]    md:w-[50%] h-[775px]  ">
          <div className="w-[80%] md:w-[60%] bg-gray-300 h-[70%] md:h-[50%] flex flex-col justify-center items-center space-y-4 border shadow-lg  rounded">
            <input
              value={email}
              name="email"
              className="w-[80%] h-[50px] rounded-sm border shadow-lg text-center"
              placeholder="Enter Your Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
            {/* {!state.emailid && (
              <p className="text-md font-medium text-red-600">
                {state.emailerror}
              </p>
            )} */}
            <input
              value={password}
              name="password"
              className="w-[80%] h-[50px] rounded-sm border shadow-lg text-center"
              placeholder="  Enter Your Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
            ></input>
            {/* {!state.password && (
              <p className="text-md font-medium text-red-600">
                {state.passworderror}
              </p>
            )} */}
            <button
              className="text-xl w-[80%] bg-gray-800 text-white rounded-md h-[50px]"
              type="submit"
              onClick={onClick}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
