import express from "express";
import {
  getAllUsers,
  getusersById,
  insertUser,
  updateUserById,
} from "../db/models/user/User.Model.js";
import { encryptPassword, comparePassword } from "../helpers/bcrypt.js";

const router = express.Router();

// get user

router.get("/:_id?", async (req, res, next) => {
  try {
    // const {_id} = req.params
    // console.log(_id)

    const data = await getAllUsers({ _id: { $ne: req.params._id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    // console.log(data);
    res.json({
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
});

// post user
router.post("/register", async (req, res, next) => {
  try {
    // console.log(req.body)
    const hashPassword = encryptPassword(req.body.password);
    req.body.password = hashPassword;
    const user = await insertUser(req.body);

    console.log(user);
    user?._id
      ? delete user.password &&
        res.json({
          status: "success",
          message: "User added Succesfully",
          user,
        })
      : res.json({
          status: "error",
          message: "Unable to add user",
        });
  } catch (error) {
    error.status = 500;

    if (error.message.includes("E11000 duplicate key")) {
      error.message = "Email already exists";
      error.status = 200;
    }
    next(error);
  }
});

// get user
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getusersById({ email });
    if (user?._id) {
      const isMatched = comparePassword(password, user.password);
      if (isMatched) {
        user.password = undefined;
        res.json({
          status: "success",
          message: "You have successfully logged in",
          user,
        });
      }
    }
    res.json({
      status: "error",
      message: "Invalid login credentials",
    });
  } catch (error) {
    next(error);
  }
});

// update user
router.post("/avatar/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const avatarImage = req.body.image;
    console.log(_id, avatarImage);
    const userData = await updateUserById(_id, {
      isAvatarImageSet: true,
      avatarImage,
    });
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
