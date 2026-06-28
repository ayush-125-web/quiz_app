import { useParams } from "react-router-dom"
import socket from "../../utilies/socket"
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminRoomPage=()=>{
    const navigate=useNavigate()

    const [status,setStatus]=useState('waiting')
    const {title,code}=useParams();
    const [players,setPlayers]=useState([])
    const [question,setQuestion]=useState(null)
    const[ended,setEnded]=useState(false)

    useEffect(()=>{
        socket.connect();
        socket.emit('host-join',{code})

        socket.on('host-joined',(obj)=>{
            setStatus(obj.roomStatus)
        })

        socket.on('all-players-list',(currplayers)=>{
            setPlayers(currplayers)
        })
        

        return()=>{
            socket.off('all-players-list')
            socket.off('leaderBoard')

            socket.disconnect()
        }

    },[code])

    useEffect(()=>{
        socket.on('leaderBoard',(leaderboard)=>{
            setPlayers(leaderboard)
        })

        return ()=>{
            socket.off('leaderBoard')
        }
    },[question])

    const handleOnClickNext=()=>{
        socket.emit('next-question',{code})
        socket.on('new-question',(obj)=>{
            setStatus(obj.roomStatus)
            setQuestion(obj.ques)
        })
        socket.on('quiz-ended',(obj)=>{
            setEnded(obj.ended)
            setPlayers(obj.lb)
            setStatus(obj.roomStatus)

        })
    }

    return(
        <>
        <div className="ms-4">
            <h1>Room Code : <strong>{code}</strong></h1>
          <hr/>
          
          <h2>Player joined : <strong>{players.length}</strong></h2>
          <hr/>
          

          {status=='waiting' && <p>Waiting for players....</p>}

          <div className="d-flex flex-column mt-5 gap-5">
            <div className="d-flex justify-content-between" >
            <div className='d-flex flex-column w-50 ms-3' style={{
                    boxShadow:'0px 0px 15px rgba(0,0,0,0.7)',
                    padding:'16px',
                    borderRadius:'18px',
                    width:'100%',
                    
                }}>
                {!question ? <p>Quiz is Yet To Start</p>:(
                    <div className="d-flex flex-column">
                        <p>{question.quesText}</p>
                        <div className="ms-3">
                            <p>A. <strong>{question.option[0]}</strong></p>
                            <p>B. <strong>{question.option[1]}</strong></p>
                            <p>C. <strong>{question.option[2]}</strong></p>
                            <p>D. <strong>{question.option[3]}</strong></p>
                        </div>
                        <p>Correct Answer: <strong>{question.corrOption}</strong></p>
                    </div>
                    
                )}     
            </div>
            <div style={{
                marginTop:'-3%'
            }}>
                <h2><i>Live LeaderBoard</i></h2>
                <hr/>
                <div className='d-flex flex-column me-4' style={{
                        boxShadow:'0px 0px 15px rgba(0,0,0,0.7)',
                        padding:'16px',
                        borderRadius:'18px',
                        width:'30vw'
                        }}>
                    {players.map((p)=>{
                        return <div className="d-flex justify-content-between">
                            <div>{p.name}</div>
                            <div>Score:{p.score}</div>
                        </div>
                    })}
                </div>
          </div>

            </div>
            

          <div className="ms-4 d-flex justify-content-between">
            <div>
                {status=='waiting'&&<button style={{
                outline:'none',
                border:'none',
                backgroundColor:'lightgreen',
                borderRadius:'15px',
                paddingInline:'70%'
            }}onClick={handleOnClickNext}>Start</button>}
            {status=='active' && <button style={{
                outline:'none',
                border:'none',
                color:'white',
                backgroundColor:'red',
                borderRadius:'15px'
            }}onClick={handleOnClickNext}>Next Question</button>}   
            </div>
            <div className="me-3">
                {ended && <button style={{
                outline:'none',
                border:'none',
                backgroundColor:'greenyellow',
                borderRadius:'15px',
             }}
             onClick={()=>navigate('/admin/dashboard')}>Exit Room</button>} 
            </div>      
          </div>     
          </div>
        </div>  
        </>
    )
}


export default AdminRoomPage