import userSchema from "./User.Schema.js";

// post
export const insertUser=(obj)=>{
    return userSchema(obj).save()
}

// get all users
export const getAllUsers=()=>{
    return userSchema.find()
}

// get users by id
export const getusersById=(_id)=>{
    return userSchema.findById(_id)
}

// update
export const updateUserById=(filter,obj)=>{
    return userSchema.findOneAndUpdate(filter,obj,{new:true})
}