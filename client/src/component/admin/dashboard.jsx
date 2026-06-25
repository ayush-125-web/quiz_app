import { useEffect } from "react"
import { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from "react-router-dom"
import { MdDelete } from "react-icons/md";

const DashBoard=()=>{

    const [quizes,setQuizzes]=useState([])
    const navigate=useNavigate()

    const getQuizes=async()=>{
        const res=await fetch('http://localhost:3000/admin/dashboard')
        const data=await res.json();
        setQuizzes(data)
    }

    useEffect(()=>{

        getQuizes()

    },[])

    const handleOnClickDeleteQuiz= async (title)=>{
        const response=await fetch('http://localhost:3000/admin/dashboard',{
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
        }}>ADMIN</h1>
        <div className="d-flex justify-content-between">
            <h2 style={{
                marginLeft:'4%'
            }}>DashBoard</h2>
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

        {quizes.length==0 ? (
            <p style={{fontSize:20}}>You have no Quizes Created</p>
        ) : (
            <div className="d-flex flex-column gap-3">
                {quizes.map((quiz)=>{
                    return <div className="d-flex gap-5 align-items-center">
                            <div style={{
                                marginLeft:'3%',
                                border:'solid',
                                borderColor:'grey',
                                padding:'5px',
                                borderRadius:'20px',
                                paddingInline:'20px',
                                width:'60%'
                            }}>
                                <h3>{quiz.title}</h3>
                            </div>
                            <MdDelete style={{cursor:'pointer'}} size={40}
                            onClick={()=>handleOnClickDeleteQuiz(quiz.title)}></MdDelete>
                        </div>
                    
                })}
            </div>
        )}
        </>
    )

}

export default DashBoard