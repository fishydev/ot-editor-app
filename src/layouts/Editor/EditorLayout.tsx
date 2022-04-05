import React from 'react'
import Footer from 'src/components/Footer/Footer'
import HeaderEditor from 'src/components/HeaderEditor/HeaderEditor'
import Editor from 'src/components/Editor/Editor'
import { useParams } from 'react-router-dom'

const EditorLayout = () => {
  let { filename } = useParams()

  return (
    <>
      <div>
        <HeaderEditor></HeaderEditor>
        <Editor filename={filename!}></Editor>
        <Footer></Footer>
      </div>
    </>
  )
}

export default EditorLayout
