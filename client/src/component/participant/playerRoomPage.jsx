import socket from "../../utilies/socket"
import { useParams,useLocation, useNavigate } from "react-router-dom"
import { useState,useEffect } from "react";


const PlayerRoom=()=>{
    const {code}=useParams();
    const location=useLocation();
    const name=location.state?.name
    const navigate=useNavigate()

    const [question, setQuestion] = useState(null)
    const [leaderboard, setLeaderboard] = useState([])
    const [hasAnswered, setHasAnswered] = useState(false)
    const [startTime, setStartTime] = useState(null)
    const [lbPopUp,setlbPopUp]=useState(false)
    const [timer,setTimer]=useState(20)
    const [clickIdx,setClickIdx]=useState(null)
    const[result,setResult]=useState(null)
    const[ended,setEnded]=useState(false)

    useEffect(()=>{
        socket.on('new-question',(obj)=>{
            setTimer(20)
            setlbPopUp(false)
            setResult(null)
            setClickIdx(null)
            setQuestion(obj.ques)
            setHasAnswered(false)
            setStartTime(Date.now())

        })

        socket.on('ans-result',(obj)=>{
            setResult(obj)
        })

        socket.on('leaderBoard',(lb)=>{
            setLeaderboard(lb)
        })

        socket.on('quiz-ended',(obj)=>{
            setLeaderboard(obj.lb)
            setQuestion(null)
            setEnded(true)
        })

        

        return()=>{
            socket.off('new-question')
            socket.off('leaderBoard')
            socket.off('quiz-ended')

        }
    },[])

    useEffect(()=>{
        if(!question) return
        const timer=setInterval(()=>{
            setTimer(prev=>{
                if(prev<=0) {
                    clearInterval(timer)
                    return 0
                }
                return prev-1
            })
        },1000)


        setTimeout(()=>{
            setlbPopUp(true)
        },23000)

        return()=>{
            clearInterval(timer)
        }
    },[question])

    const handleOnClick=(option,idx)=>{
        if(hasAnswered) return;

        setClickIdx(idx)

        setHasAnswered(true)
        const timeTaken=Date.now()-startTime
        socket.emit('submit-answer',{code,option,timeTaken})
    }

   

    const getButtonStyle=(opt,idx)=>{
        if(result){
            if(opt==result.corrOption){
                return {backgroundColor:'lightgreen',color:'white',borderRadius:'15px',border:'solid',borderColor:'grey'}
            }
            else{
                return {backgroundColor:'red',color:'white',borderRadius:'15px',border:'solid',borderColor:'grey'}
            }
        }
        if(idx==clickIdx) return {backgroundColor:'skyblue',color:'black',borderRadius:'15px',border:'solid',borderColor:'grey'}
        else return {backgroundColor:'white',color:'black',borderRadius:'15px',border:'solid',borderColor:'grey'}
    }


    return(
        <>
         <div className="d-flex flex-column align-items-center">
            <h2>Welcome {name}</h2>
            <hr/>
            {lbPopUp?(<div className="d-flex flex-column align-items-center">
                <h3>LeaderBoard</h3>
                <hr/>
                <div className="d-flex flex-column" style={{
                    boxShadow:'0px 0px 15px rgba(0,0,0,0.8)',
                    padding:'4%',
                    paddingInline:'15%',
                    width:'30vw',
                    borderRadius:'15px'
                }}>
                    {leaderboard.map((p,idx)=>{
                        return <div className="d-flex justify-content-between">
                            <div>{p.name}</div>
                            <div>Score:{p.score}</div>

                        </div>
                        
                    })}
                </div>
            </div>):(
                !question ? <p>Waiting for Question...</p>:(
                    <div>
                    <p>Time Left: {timer}</p>
                    <p>{question.quesText}</p>
                    <div className="d-flex flex-column gap-2">
                        {question.option.map((opt,idx)=>{
                        return <button style={
                            getButtonStyle(opt,idx)
                        } disabled={hasAnswered} onClick={()=>handleOnClick(opt,idx)}>{opt}</button>

                       })}
                    </div>
                    
                </div>
                )
            )}
            {ended && <div className="d-flex flex-column align-items-center gap-2 mt-5">
                <div>Quiz is Ended!</div>
                <div>Final LeaderBoard is Above! 👆👆</div>
                <div>Thanks For participating ❤️❤️</div>
                <button onClick={()=>navigate('/participant')} style={{
                    outline:'none',
                border:'none',
                backgroundColor:'lightgreen',
                borderRadius:'15px',
                paddingInline:'30%'
                }}>Exit Room</button>
                </div>}
         </div>
        </>
    )
}

export default PlayerRoom