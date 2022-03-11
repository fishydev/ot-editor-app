import React from 'react'
import EditorLayout from '../components/Layout/Editor/EditorLayout'
import EditorComponent from '../components/Editor/EditorComponent'
import { useParams } from 'react-router-dom'

const EditorRoute = () => {
  let { id } = useParams()

  return (
    <>
      <EditorLayout>
        <EditorComponent id={id!} />
      </EditorLayout>
    </>
  )
}

export default EditorRoute
