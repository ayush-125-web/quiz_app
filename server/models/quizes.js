import mongoose from "mongoose";


const questionSchema= new mongoose.Schema(
    {
        uniqueId:{
            type:String,required:true
        },
        quesText:{
            type:String,required:true
        },
        option:[String],
        corrOption:{
            type:String,required:true
        },
        points:{
            type:Number,default:10
        },
        timer:{
            type:Number,default:20
        }
    }
)

const quizSchema=new mongoose.Schema({
    title:{
        type:String,required:true,
    },
    question:[questionSchema],
    createdAt:{
        type:Date,default:Date.now
    }
})


const Quiz=mongoose.model('Quiz',quizSchema)

export default Quiz