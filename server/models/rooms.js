import mongoose from "mongoose";

const roomSchema=new mongoose.Schema({
    quizId:{
        type:mongoose.model.Schema.ObjectId,ref:'Quiz',required:true
    },
    roomStatus:{type:String,enum:['waiting','active','ended'],required:true},
    code:{
        type:Number,required:true,unique:true
    },
    currQuesIdx:{
        type:Number,required:true,default:0
    },
    createdAt:{
        type:Number,required:true,default:Date.now
    }
})

const Room=mongoose.model('Room',roomSchema)

export default Room