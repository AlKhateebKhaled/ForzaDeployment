const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userSchema");

const register = async (req, res) => {
  try {
    const { userName, email, password, address, role } = req.body;

    const newUser = new userModel({
      userName,
      email,
      password,
      address,
      role,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Account Created Successfully",
      user: newUser,
    });
  } catch (err) {
    if (err.code === 11000) {
      res
        .status(409)
        .json({ success: false, message: "The email already exists" });
    } else {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).populate("role");

    if (user) {
      const isPasswordEqual = await bcrypt.compare(
        password.trim(),
        user.password
      );

      if (isPasswordEqual) {
        const payload = {
          userId: user._id,
          userName: user.userName,
          email: user.email,
          address: user.address,
          role: user.role,
        };

        const options = { expiresIn: "240m" };
        const token = jwt.sign(payload, process.env.SECRET, options);

        return res.status(200).json({
          success: true,
          message: "Login Successful",
          token,
          user: {
            userId: user._id,
            userName: user.userName,
            email: user.email,
            address: user.address,
            role: user.role,
          },
        });
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Email not found" });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.token.userId).populate("role");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await userModel.find({}).populate("role");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Users not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const UpdateUserProfile = async (req, res) => {
  try {
    const { userName, email, address, role, socialMedia, bio, profilePicture } =
      req.body;

    const updateFields = {};

    if (userName) updateFields.userName = userName;
    if (email) updateFields.email = email;
    if (address) updateFields.address = address;
    if (role) updateFields.role = role;
    if (socialMedia) updateFields.socialMedia = socialMedia;
    if (bio) updateFields.bio = bio;
    if (profilePicture) updateFields.profilePicture = profilePicture;

    const user = await userModel.findByIdAndUpdate(
      req.token.userId,
      updateFields,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Account Updated Successfully",
      user: user,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteUserProfile = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.token.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Account Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateUserByAdmin = async (req, res) => {
  try {
    const { userName, email, password, address, role, accountStatus } =
      req.body;

    const updateFields = { userName, email, address, role, accountStatus };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashedPassword;
    }

    const user = await userModel.findByIdAndUpdate(
      req.params.userId,
      updateFields,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      user: user,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteUserByAdmin = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Account Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getUserByAdmin = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId).populate("role");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const lockUserAccount = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.params.userId,
      { accountStatus: "locked" },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User account has been locked",
      user: user,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const unlockUserAccount = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.params.userId,
      { accountStatus: "active" },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User account has been unlocked",
      user: user,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  register,
  login,
  getUserProfile,
  getAllUsers,
  UpdateUserProfile,
  deleteUserProfile,
  updateUserByAdmin,
  deleteUserByAdmin,
  getUserByAdmin,
  lockUserAccount,
  unlockUserAccount,
};
