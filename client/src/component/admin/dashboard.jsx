import { useEffect } from "react"
import { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from "react-router-dom"
import { MdDelete } from "react-icons/md";
import {motion} from 'framer-motion'
import AvailRooms from "./availRooms";

const DashBoard=()=>{

    const [quizes,setQuizzes]=useState(null)
    const navigate=useNavigate()

    const getQuizes=async()=>{
        const res=await fetch(`${import.meta.env.VITE_API_URL}/admin/dashboard`)
        const data=await res.json();
        setQuizzes(data)
    }

    useEffect(()=>{

        getQuizes()

    },[])

    const handleOnClickDeleteQuiz= async (title)=>{
        const res=await fetch(`${import.meta.env.VITE_API_URL}/admin/room/${title}`,{
            method:'DELETE',
            headers:{
                'content-type':'application/json'
            }
        })
        const response=await fetch(`${import.meta.env.VITE_API_URL}/admin/dashboard`,{
            method:'DELETE',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                title:title
            })
        })

        

        getQuizes()

    }

   

    

    return(
        <>

        <h1 style={{
            marginLeft:'4%'
        }}><strong>ADMIN</strong></h1>
        <hr style={{
            width:'20%',
            marginLeft:'3%'
        }}/>
        <div className="d-flex justify-content-between">
            <h2 style={{
                marginLeft:'4%'
            }}><i>DashBoard</i></h2>
            <button style={{
                backgroundColor:'peru',
                color:'white',
                border:'none',
                paddingInline:'2rem',
                borderRadius:'10px',
                marginRight:'5%'
            }}
            onClick={()=>navigate('/admin/dashboard/create')}>ADD QUIZ</button>
        </div>
        
        <hr/>

        {!quizes ? (<h3>Loading...</h3>) : (
            quizes.length===0 ? (
                <p style={{fontSize:20}}>You have no Quizes Created</p>
            ) : (
                <div className="d-flex flex-column flex-md-row justify-content-between gap-5 ms-4">
                    <div className="d-flex flex-column gap-3" style={{
                        flex:'1.5'
                    }}>
                    {quizes.map((quiz)=>{
                        return <div className="d-flex gap-5 align-items-center">
                                <motion.div style={{
                                    boxShadow:'0px 0px 20px rgba(0,0,0,0.8)',                               
                                    padding:'5px',
                                    borderRadius:'15px',
                                    paddingInline:'20px',
                                    cursor:'pointer',
                                    width:'100%',
                                    marginLeft:'2%'
                                }}
                                whileHover={{
                                    scale:1.08
                                }}
                                whileTap={{
                                    scale:0.5
                                }}
                                onClick={()=>navigate(`/admin/${quiz.title}`)}>
                                    <h3>{quiz.title}</h3>
                                </motion.div>
                                <MdDelete style={{cursor:'pointer'}} size={40}
                                onClick={()=>handleOnClickDeleteQuiz(quiz.title)}></MdDelete>
                            </div>
                        
                    })}
                    </div>
                    <div style={{
                        flex:'1'
                    }} >
                        <AvailRooms></AvailRooms>
                    </div>
                    
                </div>
                
            ))
        } 
        </>
    )

}

export default DashBoard