import mongoose from "mongoose";


const ansSchema=new mongoose.Schema(
    {
        roomId:{
            type:mongoose.Schema.Types.ObjectId('Room'),required:true
        },
        playerName:{
            type:String,required:true
        },
        quesIdx:{
            type:Number,required:true
        },
        selectedOption:{
            type:Number,required:true
        },
        timeTaken:{
            type:Number,required:true
        },
        ansAt:{
            type:Date,required:true,default:Date.now
        }
    }
)

const Answer=mongoose.model('Answer',ansSchema)

export default Answer