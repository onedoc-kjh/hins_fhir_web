import { useState } from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom";
import Room from "./page/Room.jsx";
import Home from "./page/Home.jsx";
import Checkup from "./page/Checkup.jsx";

function App() {

  return (
    <div className={"flex flex-col w-full h-full bg-amber-200 p-8"}>
      <Routes>
          <Route path={'/room'} element={<Room />} />
          <Route path={'/'} element={<Home />} />
          <Route path={'/checkup'} element={<Checkup />} />
      </Routes>
    </div>
  )
}

export default App
