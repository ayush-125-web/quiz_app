import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const AvailRooms=()=>{
    let title
    const navigate=useNavigate()
    const [rooms,setRooms]=useState(null)

    const getRooms=async()=>{
        const response= await fetch(import.meta.env.VITE_API_URL,{
            method:'GET',
            headers:{
                'content-type':'application/json'
            }
        })
       const data=await response.json();
       setRooms(data);   
    }

    useEffect(()=>{
        getRooms()
    },[rooms])

    return(
        <>
          <div>
            <h3>Rooms</h3>
            <hr/>

            {!rooms && <p>Loading...</p>}
            {rooms && 
                <ul style={{
                        boxShadow:'0px 0px 20px rgba(0,0,0,0.8)',
                        padding:'15px',
                        borderRadius:'20px',
                        marginRight:'3%',
                        height:'50vh',
                        overflowY:'auto'
                        
                    }}>
                    {
                        rooms!=0 ?
                        rooms.map((room)=>{
                        return <l>
                                <div className="d-flex justify-content-between">
                                    <div>
                                    <h6><strong>{room.quizId.title}</strong></h6>
                                    <p>Room Code : {room.code}</p>
                                    <p>Room Status: <i>{room.roomStatus}</i></p>
                                </div> 
                                {room.roomStatus!='ended'? <button style={{
                                    height:'7%',
                                    paddingInline:'30px'
                                }}
                                onClick={()=>navigate(`/admin/${title}/${room.code}`)}>Enter</button>:(
                                    <button style={{
                                        height:'7%',
                                        paddingInline:'30px',
                                        cursor:'not-allowed'
                                    }} disabled='true'>Ended</button>
                                )}
                                
                            </div>   
                        </l>   
                    }):<p>No Room Available</p>}
                </ul>
            }
            

          </div>
         
        </>
    )
}

export default AvailRooms