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
export const getusersById=filter=>{
    return userSchema.findOne(filter)
}

// update
export const updateUserById=(filter,obj)=>{
    return userSchema.findOneAndUpdate(filter,obj,{new:true})
}