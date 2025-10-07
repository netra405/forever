import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    

    const user = await userModel.findOne({email});
    if(!user){
        return res.json({success: false, message: "User dosen't exist"})
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if(isMatch){
        const token = createToken(user._id);
        res.json({success: true, token})
    }
    else{
        res.json({success: false, message: "Invalid Credentials"})
    }

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, msg: "User already exists" });
    }

    // validate email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        msg: "Please enter a valid email address (e.g., user@example.com)",
      });
    }

    //  optional domain validation
    const allowedDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com", "edu.np"];
    const domain = email.split("@")[1];
    if (!allowedDomains.includes(domain)) {
      return res.json({
        success: false,
        msg: "Email domain not supported. Please use a common domain like Gmail, Yahoo, or Outlook.",
      });
    }

    // validate strong password
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/;

    if (!strongPasswordRegex.test(password)) {
      return res.json({
        success: false,
        msg: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character (!@#$%)",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // generate token
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign(email+password, process.env.JWT_SECRET);
        res.json({ success: true, token });
    }
    else {
        res.json({ success: false, message: "Invalid Credentials" });
    }

   
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin };
