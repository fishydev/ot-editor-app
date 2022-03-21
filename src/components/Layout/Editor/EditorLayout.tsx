import React from 'react'
import Footer from '../../Footer/Footer'
import HeaderEditor from '../../HeaderEditor/HeaderEditor'
import Editor from "src/components/Editor/Editor"
import { useParams } from 'react-router-dom'

const EditorLayout = () => {
  let { id } = useParams()

  return (
  <>
    <div>
      <HeaderEditor></HeaderEditor>
      <Editor id={id!}></Editor>
      <Footer></Footer>
    </div>
  </>
  )
}

export default EditorLayout
