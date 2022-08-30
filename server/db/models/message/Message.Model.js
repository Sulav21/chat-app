import messageSchema from './Message.Schema.js'

export const insertMessages=(obj)=>{
    return messageSchema(obj).save()
}

export const getAllMessages=(filter)=>{
    return messageSchema.find(filter).sort({updatedAt:1})
}

