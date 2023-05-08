import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import {useState, useEffect} from 'react'
import MainPage from './component/main/mainPage';
import AddProduct from './component/adm/addProduct';

function App() {
  return (
    <Routes>
    <Route path='/' element={<MainPage/>}/>
    <Route path='/adm' element={<AddProduct/>}/>
   
    </Routes>
  );
}

export default App;
