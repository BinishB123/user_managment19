const usersModel = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const adminModel = require("../Model/adminModel");
const { json } = require("express");
const getUser = async (req, res) => {
  const { emailid, password } = req.body;
  console.log(emailid, password);
  try {
    const userExists = await usersModel.findOne({ email: emailid });
    if (userExists) {
      const passwordMatching = await bcrypt.compare(
        password,
        userExists.password
      );

      if (passwordMatching) {
        const user = {
          id: userExists._id,
          name: userExists.name,
          email: userExists.email,
          mobile: userExists.mobile,
          image: userExists.imgUrl ? userExists.imgUrl : null,
        };
        if (!userExists.isActive) {
         return res.status(401).json({ message: "you are blocked" });
        }
      
        res.status(200).json({
          message: "User found successfully",
          user: user,
          token: generateJwtToken(userExists._id),
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    
    res.status(500).json({ message: "Server error" });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, emailid, mobile, password } = req.body;
    console.log(req.body);
    if (!name || !mobile || !emailid || !password) {
      res.status(400);
      throw new Error("please fill all the fields");
    }
    const userExists = await usersModel.findOne({ email: emailid });

    if (!userExists) {
      const saltRounds = 10 
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = await usersModel.create({
        name: name,
        mobile: mobile,
        email: emailid,
        password: hashedPassword,
      });
      const createdUser = {
        id:user._id,
        name: user.name,
        mobile: user.mobile,
        email: user.email,
       

      }
      if (user) {
        res.status(201).json({
          message: "User created successfully",
          user: createdUser,
          token: generateJwtToken(user._id),
        });
      } else {
        res.status(400).json({ message: "User not created" });
      }
    } else {
      res.status(400).json({ message: "User already exists" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const generateJwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECERT, {
    expiresIn: "30d",
  });
};

const getMe = (req, res) => {
  try {
    res.status(200).json({ message: req.user });
  } catch (error) {
    console.log();
  }
};

const updateUser = async (req, res) => {
  try {
    const { id, name, emailid, mobile, image } = req.body;
    

    // Check if the email already exists for another user
    const existingUser = await usersModel.findOne({ email: emailid });
    console.log(existingUser._id.toString() ,id);
    if ( existingUser._id.toString() !== id) {
      return res.status(400).json({
        message: "Email is already taken by another user",
      });
    }
      if (!existingUser.isActive) {
        return res.json({message:"you are blocked"})
      }
    const updateData = {
      name: name,
      email: emailid,
      mobile: mobile,
    };

    // Add image URL to update data if it exists
    if (image) {
      updateData.imgUrl = image;
    }

    const userUpdated = await usersModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (userUpdated) {
      const user = {
        id: userUpdated._id,
        name: userUpdated.name,
        email: userUpdated.email,
        mobile: userUpdated.mobile,
        image: userUpdated.imgUrl ? userUpdated.imgUrl : null,
      };

      res.status(200).json({
        message: "Updated successfully",
        user: user,
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      message: "An error occurred while updating the user",
      error: error.message,
    });
  }
};



const userController = {
  getUser,
  createUser,
  getMe,
  updateUser,
 
};
module.exports = userController;
