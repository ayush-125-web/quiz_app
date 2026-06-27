import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: String,
  socketId: String,
  score: { type: Number, default: 0 },
  answers: [{ questionId: mongoose.Schema.Types.ObjectId, isCorrect: Boolean, timeTaken: Number }]
})

const roomSchema=new mongoose.Schema({
    quizId:{
        type:mongoose.Schema.Types.ObjectId,ref:'Quiz',required:true
    },
    roomStatus:{type:String,enum:['waiting','active','ended'],required:true},
    code:{
        type:String,required:true,unique:true
    },
    currQuesIdx:{
        type:Number,required:true,default:-1
    },
    players:[playerSchema],
    createdAt:{
        type:Date,required:true,default:Date.now
    },
    hostSocketId:String
})

const Room=mongoose.model('Room',roomSchema)

export default Room