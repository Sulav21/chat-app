import express from "express";
import { getAllMessages, insertMessages } from "../db/models/message/Message.Model.js";
const router = express.Router();


router.post("/addmsg", async (req, res, next) => {
  try {
    console.log(req.body)
    const {to,from,message} = req.body;
    const data = await insertMessages({
        message:{text:message},
        users:[from,to],
        sender:from,
    })
    if(data){
        res.json({
            status:"success",
            message:'message added succesfully'
        })
    }else{
        res.json({
            status:'error',
            message:'fail to add message to the database'
        })
    }
  } catch (err) {
    next(err);
  }
});

router.post("/getmsg", async(req, res, next) => {

  try{
    const {from,to} = req.body;
    const messages = await getAllMessages({
      users:{
        $all:[from,to],
      },
    })
    const projectedMessages = messages.map((msg)=>{
      return {
        fromSelf: msg.sender.toString()===from,
        message:msg.message.text
      }
    })
 
    res.json(projectedMessages)

  }catch(err){
    next(err)
  }
});

export default router;
