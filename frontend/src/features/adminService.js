import axios from "axios";
const API_URL = "http://localhost:5000";

const adminLogin = async (adminData) => {
  const response = await axios.post(API_URL + "/admin/getHome", adminData);
  if (response.data) {
    localStorage.setItem("admin", response.data.admin);
  }
  return response.data;
};

const updateAdminData = async () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  // console.log("admin.token", admin.token);
  const config = {
    headers: { Authorization: `Bearer ${admin.token}` },
  };
  const response = await axios.get(API_URL + "/admin/updateAdminData", config);

  if (response.data) {
    localStorage.setItem("admin", JSON.stringify(response.data));
    return response.data;
  }
};

const adminUpdateUser = async (userData) => {
  const admin = JSON.parse(localStorage.getItem("admin"));
 console.log("u",userData);
  const config = {
    headers: { Authorization: `Bearer ${admin.token}` },
  };
  const response = await axios.patch(
    API_URL + "/admin/updatingUser",
    userData,
    config
  );
  return response.data;
};

const blockUnblock = async (userid) => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const user = {
    id: userid,
  };
  const config = {
    headers: { Authorization: `Bearer ${admin.token}` },
  };
  const response = await axios.patch(
    API_URL + "/admin/blockUnblock",
    user,
    config
  );
  if (response.data) {
    const { updatedUser } = response.data;
    const { user, admin, token } = JSON.parse(localStorage.getItem("admin"));
    const newUsers = user.map((data) => {
      if (data?._id.toString() === updatedUser?._id) {
        return updatedUser;
      }
      return data;
    });
    localStorage.setItem(
      "admin",
      JSON.stringify({ user: newUsers, admin, token })
    );
    return response.data;
  }
};



const searchedUser = async (searchTerm) => {
  try {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (!admin) throw new Error("Admin not found in localStorage");

    const config = {
      headers: { Authorization: `Bearer ${admin.token}` },
    };

    const search = {
      string: searchTerm,
    };

    const response = await axios.post(
      API_URL + "/admin/search",
      search,
      config
    );

    if (response.data) {
      const updatedAdmin = { ...admin, user: response.data.users };
      localStorage.setItem("admin", JSON.stringify(updatedAdmin));
      return response.data;
    }
  } catch (error) {
    console.error("Error searching users:", error);
    // Handle the error appropriately in your application
    throw error;
  }
};

const addUser = async (newUser) => {
  const admin = JSON.parse(localStorage.getItem("admin"));

  const config = {
    headers: { Authorization: `Bearer ${admin.token}` },
  };
  const response = await axios.post(
    API_URL + "/admin/adduser",
    newUser,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const adminLogout = async () => {
  localStorage.removeItem("admin");
};

const adminService = {
  adminLogin,
  adminLogout,
  updateAdminData,
  adminUpdateUser,
  blockUnblock,
  addUser,
  searchedUser,
};

export default adminService;
