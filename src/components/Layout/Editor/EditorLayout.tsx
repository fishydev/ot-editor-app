import React from "react"
import Footer from "../../Footer/Footer"
import HeaderEditor from "../../HeaderEditor/HeaderEditor"
import EditorComponent from "src/components/Editor/EditorComponent"
import { useParams } from "react-router-dom"

const EditorLayout = () => {
  let { id } = useParams()
  return (
    <>
      <div>
        <HeaderEditor></HeaderEditor>
        <main>
          <EditorComponent id={id!} />
        </main>
        <Footer></Footer>
      </div>
    </>
  )
}

export default EditorLayout
