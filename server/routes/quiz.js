import express from 'express'
import Quiz from '../models/quizes.js';

const router=express.Router();

router.get('/',(req,res)=>{
    res.redirect('/dashboard')
})

router.post('/dashboard',(req,res)=>{
    
    Quiz.create(req.body)
     .then(result=>{
        res.status(201).end();
     })
     .catch(err=>console.log(err))
})

router.get('/dashboard',(req,res)=>{
    Quiz.find()
     .then(result=>res.json(result))
     .catch(err=>console.log(err))
})

router.delete('/dashboard',(req,res)=>{
    console.log(req.body)
    Quiz.deleteOne(req.body)
     .then(result=>res.status(200).end())
     .catch(err=>console.log(err))
})

router.get('/:title',(req,res)=>{
    Quiz.findOne({title:req.params.title})
     .then(result=>res.json(result))
     .catch(err=>console.log(err))
})



export {router}