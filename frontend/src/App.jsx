import React from 'react'
import "./index.css"
import Login from './components/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Home from './components/Home'

const App = () => {
  return (
    <div>
        
        <BrowserRouter>
        <Routes>
            <Route element={<Login/>} path='/'/>
            <Route element={<Register/>} path="/register"/>
            <Route element={<Home/>} path="/home"/>
        </Routes>
        </BrowserRouter>
        
    </div>
  )
}

export default App