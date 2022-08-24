import express from "express";
import { insertUser } from "../db/models/user/User.Model.js";
import { encryptPassword } from "../helpers/bcrypt.js";

const router = express.Router();

// post user
router.post("/register", async (req, res, next) => {
  try {
    // console.log(req.body)
    const hashPassword = encryptPassword(req.body.password);
    req.body.password = hashPassword;
    const result = await insertUser(req.body);

    console.log(result);
    result?._id
      ? res.json({
          status: "success",
          message: "User added Succesfully",
        })
      : res.json({
          status: error,
          message: "Unable to add user",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
