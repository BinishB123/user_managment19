import LoginPage from "./pages/loginpage";
import "./App.css";
import SignUp from "./pages/signup";
import UserDash from "./pages/userDash";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ToastContainer } from "react-toastify";
import AdminLogin from "./pages/adminLogin";
import AdminHome from "./pages/adminHome";
import CreateUser from "./pages/createUser";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer />
        <div className="App h-[100%]">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<UserDash />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/adminHome" element={<AdminHome />} />
            <Route path="createuser" element={<CreateUser />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
