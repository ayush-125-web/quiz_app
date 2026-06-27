import './App.css'
import Home from "./component/home"
import {Routes,Route} from 'react-router-dom'
import DashBoard from './component/admin/dashboard'
import AddQuiz from './component/admin/addQuizForm'
import QuizPage from './component/admin/quizPage'
import EnterRoom from './component/participant/enterRoom'
import AdminRoomPage from './component/admin/adminRoomPage'
import PlayerRoom from './component/participant/playerRoomPage'

function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>

        //admin
        <Route path='/admin/dashboard' element={<DashBoard/>}></Route>
        <Route path='/admin/dashboard/create' element={<AddQuiz/>}></Route>
        <Route path='/admin/:title' element={<QuizPage/>}></Route>
        <Route path='/admin/:title/:code' element={<AdminRoomPage/>}></Route>

        //participant
        <Route path='/participant' element={<EnterRoom/>}></Route>
        <Route path='/participant/:code' element={<PlayerRoom/>}></Route>
        
      </Routes>
    </>
  )
}

export default App
