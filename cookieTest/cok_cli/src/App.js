import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [coo,setCoo] = useState("");
  const heroUrl = "https://safe-stream-00868.herokuapp.com/cook";
  // const heroUrl = "http://localhost:5000/cook";
  const handleCookie = () =>{
    console.log("going to bring cookies");
    fetch(heroUrl,{credentials:"include"})
    .then(res=>res.json())
    .then(data=>{
      console.log(data,"check if cookie is set to browser");
    })
  }
  
  const handleAxiosCookie = async() =>{
    console.log("going to bring cookies");
    const {data} = await axios.get(heroUrl,{withCredentials: true})
    console.log(data);
  }

  const handleSeeCookie = async() =>{
    console.log("going to bring cookies");
    const {data} = await axios.get("https://safe-stream-00868.herokuapp.com/recook",{withCredentials: true})
    setCoo(data);
  }

  return (
    <div className="App">
      <h2>Set cookies</h2>
      <button onClick={handleCookie} >Call cookie</button>
      <button onClick={handleAxiosCookie} >Call axios cookie</button>
      <button onClick={handleSeeCookie} >see cookie</button>
      <p>{coo}</p>
    </div>
  );
}

export default App;
