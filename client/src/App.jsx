import './App.css'
import Home from "./component/home"
import {Routes,Route} from 'react-router-dom'
import DashBoard from './component/admin/dashboard'
import AddQuiz from './component/admin/addQuizForm'
import QuizPage from './component/admin/quizPage'

function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/admin/dashboard' element={<DashBoard/>}></Route>
        <Route path='/admin/dashboard/create' element={<AddQuiz/>}></Route>
        <Route path='/admin/:title' element={<QuizPage/>}></Route>
      </Routes>
    </>
  )
}

export default App
