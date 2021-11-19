import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Arbitage from "./components/arbitage";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Arbitage />
    </div>
  );
}

export default App;
