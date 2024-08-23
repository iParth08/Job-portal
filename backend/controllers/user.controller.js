import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register new user
// Method : POST
// Path : /api/v1/user/register
// Task : Create new user in database
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    // validate if empty
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // validate if email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    // create new user
    const hashedPassword = await bcrypt.hashSync(password, 10);
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    // ALL GOOD
    return res.status(201).json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error.message, location: "register", success: false });
  }
};

// login user
// Method : POST
// Path : /api/v1/user/login
// Task : Generate logic token
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    //validate if empty
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // find user in database
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User does not exist", success: false });
    }

    // validate password if user exists
    const isPasswordMatched = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatched) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    // check if role matches
    if (user.role !== role) {
      return res.status(401).json({
        message: "Account does not exist with this role.",
        success: false,
      });
    }

    // token generation
    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // userData
    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    //ALL GOOD
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        user: userData,
        message: `Welcome ${user.fullname}`,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error.message, location: "login", success: false });
  }
};

// logout user
// Method : GET
// Path : /api/v1/user/logout
// Task : Clear cookie/ remove token
export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ success: true, message: "Logged out" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error.message, location: "logout", success: false });
  }
};

// update profile
// Method : POST
// Path : /api/v1/user/profile/update
// Task : Update user profile

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file; //? file upload

    // provide what needs to change //!TRY WITH PUT METHOD

    //? Cloudinary code here.......

    const userId = req.id; // middleware injection

    // find user in database
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User does not found", success: false });
    }

    // update/modify user
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",");

    //? resume upload ....

    await user.save(); // save changes to user in database

    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      success: true,
      user: userData,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      location: "updateProfile",
      success: false,
    });
  }
};
