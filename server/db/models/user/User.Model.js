import userSchema from "./User.Schema.js";

// post
export const insertUser=(obj)=>{
    return userSchema(obj).save()
}

// get all users
export const getAllUsers=(filter)=>{
    return userSchema.find(filter)
}

// get users by id
export const getusersById=filter=>{
    return userSchema.findOne(filter)
}

// update
export const updateUserById=(filter,obj)=>{
    return userSchema.findByIdAndUpdate(filter,obj,{new:true})
}