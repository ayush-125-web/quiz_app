import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";

const QuizPage=()=>{
    const {title}=useParams();
    const [quiz,setQuiz]=useState(null)
    const navigate=useNavigate()

    const handleOnClickCreateRoom=async (quizId)=>{
        const response= await fetch(`http://localhost:3000/admin/${title}/create`,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                quizId
            })
        })

        const data=await response.json()

        navigate(`${data.roomCode}`)
    }

    useEffect(()=>{
        fetch(`http://localhost:3000/admin/${title}`,{
        method:'GET',
        headers:{
            'content-type':'application/json'
        }
        })
        .then(response=>response.json())
        .then(data=>setQuiz(data))

    },[])
    
    if(!quiz){
        return(
            <>
            <h2>Loading...</h2>
            </>
        )
    }
    else{
        return(
            <>
            <div className="ms-5 mt-3">
                <h2>{quiz.title}</h2>
                <hr/>
                <div className="d-flex gap-2 justify-content-between">
                    <div className="d-flex flex-column gap-1"
                    style={{
                        flex:0.6
                    }}>
                        {
                        quiz.question.map((ques,idx)=>{
                            return <div style={{
                                border:'solid',
                                borderColor:'grey',
                                padding:'16px',
                                borderRadius:'18px',
                                width:'100%'
                            }}>
                            <div className="d-flex gap-2 justify-content-between">
                            <div className="d-flex gap-2">
                                <span><strong>{idx+1}.</strong></span>
                                <p>{ques.quesText}</p>
                            </div>
                            </div>
                            <div className="ms-3">
                                <p>A. <strong>{ques.option[0]}</strong></p>
                                <p>B. <strong>{ques.option[1]}</strong></p>
                                <p>C. <strong>{ques.option[2]}</strong></p>
                                <p>D. <strong>{ques.option[3]}</strong></p>

                            </div>

                            <p>Correct Answer: <strong>{ques.corrOption}</strong></p>

                        </div>
                        })
                        }
                    </div> 
                    <div>
                        <button style={{
                        marginRight:'10%',
                        border:'none',
                        backgroundColor:'skyblue',
                        paddingInline:'30px',
                        color:'white',
                        padding:'3%',
                        borderRadius:'25px'
                    }}
                    onClick={()=>handleOnClickCreateRoom(quiz._id)}>Create Room</button>

                    </div>
                    
                </div>

            </div>   
            </>
        )
    }

}

export default QuizPage