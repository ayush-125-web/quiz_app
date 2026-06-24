import express from 'express'
import Room from '../models/rooms.js';


const router=express.Router();

router.post('/room',(req,res)=>{
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    Room.create({...red.body,code:code})
     .then(result=>{
        res.redirect(`/room/${code}`)
     })

})

router.get('/room/:code',(req,res)=>{
    Room.findById({code:req.params.code}).populate('quizId')
     .then(result=>res.json(result))
     .catch(err=>res.json(err))
})



export {router}