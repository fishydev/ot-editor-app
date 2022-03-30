import React from 'react'
import HomeLayout from 'src/components/Layout/Home/HomeLayout'
import EditorLayout from 'src/components/Layout/Editor/EditorLayout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from 'src/components/Home/Home'
import Files from 'src/pages/Files/Files'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomeLayout>
              <Home />
            </HomeLayout>
          }
        ></Route>
        <Route
          path="/files"
          element={
            <HomeLayout>
              <Files />
            </HomeLayout>
          }
        ></Route>
        <Route path="/editor/:id" element={<EditorLayout />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
