import React from 'react'
import GlobalLayout from 'src/layouts/Global/GlobalLayout'
import EditorLayout from 'src/layouts/Editor/EditorLayout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from 'src/components/Home/Home'
import Files from 'src/components/Files/Files'
import store from 'src/redux/store'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <GlobalLayout>
                  <Home />
                </GlobalLayout>
              }
            ></Route>
            <Route
              path="/files"
              element={
                <GlobalLayout>
                  <Files />
                </GlobalLayout>
              }
            ></Route>
            <Route path="/files/:uuid" element={<EditorLayout />}></Route>
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>
  )
}

export default App
