const adminModel = require("../Model/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersModel = require("../Model/userModel");

const generateJwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECERT, {
    expiresIn: "30d",
  });
};

const adminDataUpadate = async (req, res) => {
  try {
    const adminExists = await adminModel.findOne({ email: "admin@gmail.com" });
    const user = await usersModel.find({}, { password: 0 });
    res.status(200).json({
      user: user,
      message: "Admin authenticated successfully",
      admin: adminExists.email,
      token: generateJwtToken(adminExists._id),
    });
  } catch (error) {
  
    res.status(500).json({ message: "Server error" });
  }
};

const adminGet = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const adminExists = await adminModel.findOne({ email: email });

    if (!adminExists) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const passwordMatching = await bcrypt.compare(
      password,
      adminExists.password
    );

    if (!passwordMatching) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const user = await usersModel.find({}, { password: 0 });

    res.status(200).json({
      user: user,
      message: "Admin authenticated successfully",
      admin: adminExists.email,
      token: generateJwtToken(adminExists._id),
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updatingUser = async(req,res)=>{
  try {
   const {id,name,mobile,emailid} = req.body
   const user = await usersModel.findOne({email:emailid})
   console.log(user._id,id);
   if (id!==user._id.toString()) {
   return res.json({message:"user with same email exists"})
   }
   const userUpdated = await usersModel.findByIdAndUpdate(
    id,
    {
      name: name,
      email: emailid,
      mobile: mobile,
    },
    { new: true }
  );
  if (userUpdated) {
    res.status(200).json({
      message: "Updated successfully",
    });
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
 
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
}

const blockUnblock = async (req, res) => {
  try {
   
    const { id } = req.body;
    const user = await usersModel.findOne({ _id: id });
    
    if (user) {
    const updatedUser = await usersModel.findByIdAndUpdate(id, {
        isActive: !user.isActive,
      },{new:true});

      res.status(200).json({
        updatedUser : updatedUser
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const adduser = async (req, res) => {
  const { name, emailid, mobile, password } = req.body;

  // Check for all required fields
  if (!name || !mobile || !emailid || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  try {
    // Check if user already exists
    const userExists = await usersModel.findOne({ email: emailid });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user
    const user = await usersModel.create({
      name,
      mobile,
      email: emailid,
      password: hashedPassword,
    });

    if (user) {
      return res.status(201).json({
        message: "User created successfully",
       
      });
    } else {
      return res.status(400).json({ message: "User not created" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

const search = async (req, res) => {
  try {
    const { string } = req.body;

    
    const escapedString = string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  
    const regex = new RegExp(`${escapedString}`, 'i');
   

    const searchedUsers = await usersModel.find({ 
      name: { $regex: regex }
    });

    res.status(200).json({users:searchedUsers});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const adminController = {
  adminGet,
  adminDataUpadate,
  updatingUser,
  blockUnblock,
  adduser,
  search
};

module.exports = adminController;
