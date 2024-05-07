import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {   SignupPage } from './pages/Signup';
import Signin from './components/Signin';
import { Dashboard } from './pages/Dashboard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <BrowserRouter >
        <Routes>
          <Route path= "/signup" element={<SignupPage />}> </Route>
           <Route path ="/signin" element={<Signin />}> </Route>
           <Route path ="/dashboard" element={<Dashboard />}> </Route>

        </Routes>
      </BrowserRouter>
     </>
  )
}

export default App
