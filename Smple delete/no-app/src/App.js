import logo from './logo.svg';
import './App.css';
import { useEffect, useRef } from 'react';
import {io} from "socket.io-client";

function App() {
  const soketRef = useRef();

  useEffect(()=>{
    soketRef.current = io("http://localhost:5000");
  },[]);

  useEffect(()=>{
    soketRef.current.on("connection",(data)=>{
      console.log("connected");
    })
  },[]);

 const handler = () =>{
  soketRef.current.emit("myMessage",{
    msg: "I am ok",
    question: "how are you?"
  })
 }


  return (
    <div className="App">
      <input  type="text" />
      <button onClick={handler}>send message</button>
    </div>
  );
}

export default App;
