const express = require("express");
const auth = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const accountLockCheck = require("../middleware/accountLockCheck");

const {
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
} = require("../controllers/user");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);

userRouter.get("/profile", auth, getUserProfile);
userRouter.get("/admin", auth, authorization("get_all_users"), getAllUsers);
userRouter.get(
  "/admin/:userId",
  auth,
  authorization("get_user"),
  getUserByAdmin
);

userRouter.put("/profile", auth, UpdateUserProfile);
userRouter.put(
  "/admin/:userId",
  auth,
  authorization("update_user"),
  updateUserByAdmin
);

userRouter.put(
  "/admin/:userId/lock",
  auth,
  authorization("lock_user"),
  lockUserAccount
);
userRouter.put(
  "/admin/:userId/unlock",
  auth,
  authorization("unlock_user"),
  unlockUserAccount
);

userRouter.delete("/profile", auth, deleteUserProfile);

userRouter.delete(
  "/admin/:userId",
  auth,
  authorization("delete_user"),
  deleteUserByAdmin
);

module.exports = userRouter;
