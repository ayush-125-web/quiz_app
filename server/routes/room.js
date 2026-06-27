import express from 'express'
import Room from '../models/rooms.js';
import genrateCode from '../utilies/genrateCode.js';
import Quiz from '../models/quizes.js';


const router=express.Router();

router.delete('/room/:title',async(req,res)=>{
    try{
        const quiz=await Quiz.findOne({title:req.params.title})
        const room=await Room.deleteOne({quizId:quiz._id})
        res.status(201).end()
    }
    catch(err){
        res.status(500).end()
        console.log(err.message)
    }
})

router.post('/:title/create',async (req,res)=>{

    try{
        let code= await genrateCode()
        let {quizId}=req.body

        const room=await Room.create({quizId,roomStatus:'waiting',code})
        res.status(201).json({sucess:true,roomCode:room.code,roomId:room._id})
    }
    catch(error){
        res.status(500).json({sucess:false,message:error.message})
    }
    
})

router.get('/room/:code',async (req,res)=>{
    const response=await Room.findOne({code:req.params.code})
    res.json(response)   
})

router.get('/rooms',async(req,res)=>{
    const rooms=await Room.find().sort({createdAt:-1}).populate('quizId')
    res.json(rooms)
})


export {router}