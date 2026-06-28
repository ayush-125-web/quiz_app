import {io} from 'socket.io-client'


const socket =io(import.meta.VITE_API_URL,{
    autoConnect:false
})

export default socket