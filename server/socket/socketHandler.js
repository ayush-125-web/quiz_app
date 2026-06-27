import Room from "../models/rooms.js"
import Quiz from "../models/quizes.js"


const setUpSocket=(io)=>{
    io.on('connection',(socket)=>{
        console.log(`Socket connected with id : ${socket.id}`)

        socket.on('host-join',async({code})=>{    //handling admin joinning
            const room= await Room.findOne({code})
            room.hostSocketId=socket.id

            await room.save()

            socket.join(code)
            socket.emit('host-joined',{code,roomStatus:room.roomStatus})
        })


        socket.on('player-join',async({name,code})=>{   //handle player-joining
            const room=await Room.findOne({code})

            if(!room){
                return socket.emit('msg','Invalid Room Code')
            }
            if(room.roomStatus!='waiting'){
                return socket.emit('msg','quiz is either already started or ended')
            }

            const playerExist=room.players.find(player=>name==player.name)
            if(playerExist){
                return socket.emit('msg','enter diff username')
            }
            else{
                room.players.push({name,socketId:socket.id})
                await room.save();
            }

            socket.join(code)

            io.to(code).emit('all-players-list',room.players)
            socket.emit('player-joined',{name,code,msg:'Room joined Sucessfully'})

        })

        socket.on('next-question',async({code})=>{      //display question to all connected client
            const room=await Room.findOne({code}).populate('quizId')

            room.roomStatus='active'
            room.currQuesIdx+=1

            await room.save()

            const currQues=room.quizId.question[room.currQuesIdx]

            if(!currQues){
                room.roomStatus='ended'
                await room.save()
                return io.to(code).emit('quiz-ended',{ended:true,lb:room.players.sort((x,y)=>y.score-x.score)})
            }

            const ques={
                quesText:currQues.quesText,
                option:currQues.option,
                corrOption:currQues.corrOption,
                timer:currQues.timer
            }

            io.to(code).emit('new-question',{ques,roomStatus:room.roomStatus})


        })

        socket.on('submit-answer',async({code,option,timeTaken})=>{
            const room=await Room.findOne({code}).populate('quizId')
            const ques=room.quizId.question[room.currQuesIdx]
            const player= room.players.find(player=>player.socketId===socket.id)


            const isCorrect=ques.corrOption===option

            if(isCorrect){
                const score=Math.max(ques.points-Math.floor(timeTaken/1000),Number(ques.points/2))
                player.score+=score
            }

            player.answers.push({questionId:ques._id,isCorrect,timeTaken})
            await room.save()


            const leaderBoard=room.players.sort((x,y)=>y.score-x.score)
            io.to(code).emit('leaderBoard',leaderBoard)

            socket.emit('ans-result',{isCorrect,corrOption:ques.corrOption})
        })
    })
}

export default setUpSocket