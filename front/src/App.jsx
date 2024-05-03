
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './views/Home/Home'
import MyAppointments from './views/MyAppointments/MyAppointments'
import Register from './views/Register/Register'
import Login from './views/Login/Login'
import { CreateAppointment } from './views/CreateAppointment/CreateAppointment'
import ErrorPage from './views/ErrorPage/ErrorPage'
import Footer from './components/Footer/Footer'

function App() {

  return (
    <>
      <Navbar />
      <Routes >
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/appointments' element={<MyAppointments />}/>
        <Route path='/createappointment' element={<CreateAppointment />}/>
        <Route path='/*' element={<ErrorPage />}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
