import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Home from './components/Home';
import CartDetails from './components/CartDetails';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


function App() {
  

  return (
    <>
  <BrowserRouter>
  <Header></Header>
  <Routes>
   <Route path= "/" element = {<Home></Home>}></Route>
   <Route path= "/cartDetails" element = {<CartDetails></CartDetails>}></Route>
  </Routes>
  <Toaster />
    </BrowserRouter>
    </>
  )
}

export default App
