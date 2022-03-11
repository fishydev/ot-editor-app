import React from 'react'
import HomeRoute from './routes/HomeRoute'
import EditorRoute from './routes/EditorRoute'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRoute />}></Route>
        <Route path="/editor/:id" element={<EditorRoute />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
