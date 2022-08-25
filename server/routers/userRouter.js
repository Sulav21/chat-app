import express from "express";
import { getusersById, insertUser, updateUserById } from "../db/models/user/User.Model.js";
import { encryptPassword,comparePassword} from "../helpers/bcrypt.js";

const router = express.Router();

// post user
router.post("/register", async (req, res, next) => {
  try {
    // console.log(req.body)
    const hashPassword = encryptPassword(req.body.password);
    req.body.password = hashPassword;
    const user = await insertUser(req.body);

    console.log(user);
    user?._id
      ? res.json({
          status: "success",
          message: "User added Succesfully",
          user
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
        user.password = undefined
        res.json({
          status: "success",
          message: "You have successfully logged in",
          user
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
router.patch('/avatar/:id',async(req,res,next)=>{
  try{
   const {_id} = req.params.id
   const avatarImage = req.body.image
   const userData= await updateUserById(_id,{
    isAvatarImageSet:true,
    avatarImage,
   })
   return res.json({
    isSet: userData.isAvatarImageSet,
    image:userData.avatarImage
   })

  }catch(error){
    next(error)
  }
})

export default router;
