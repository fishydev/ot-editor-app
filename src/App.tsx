import React from 'react'
import HomeLayout from "src/components/Layout/Home/HomeLayout"
import EditorLayout from "src/components/Layout/Editor/EditorLayout"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}></Route>
        <Route path="/editor/:id" element={<EditorLayout />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
