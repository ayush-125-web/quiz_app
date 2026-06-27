import { useRef } from "react"
import socket from "../../utilies/socket"
import { useNavigate } from "react-router-dom"


const EnterRoom = () => {
    const userName=useRef(null),roomCode=useRef(null)
    const navigate=useNavigate()

    const handleOnSubmit=(e)=>{
        e.preventDefault()
        const name=userName.current.value,code=roomCode.current.value
        userName.current.value='',roomCode.current.value=''

        socket.connect()

        socket.emit('player-join',{name,code})
        socket.once('msg',(msg)=>{
            alert(msg)
        })
        socket.once('player-joined',(obj)=>{
            navigate(`${obj.code}`,{state:{name}})
        })

    }


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            margin: 0
        }}>
            <form onSubmit={handleOnSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                width: '300px',
                gap: '10px',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'  
            }}>
                <label>Enter UserName</label>
                <input type="text" ref={userName} required style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
                <label>Room Code</label>
                <input type="text" ref={roomCode} required style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
                <button type="submit" style={{ padding: '10px', borderRadius: '6px', border: 'none', backgroundColor: '#4f46e5', color: 'white', cursor: 'pointer' }}>Enter</button>
            </form>
        </div>
    )
}

export default EnterRoom

