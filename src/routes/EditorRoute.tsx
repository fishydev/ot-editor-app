import React from "react"
import EditorLayout from "../components/Layout/Editor/EditorLayout"
import EditorComponent from "../components/Editor/EditorComponent";

const EditorRoute = () => {
  return (
    <>
      <EditorLayout>
        <EditorComponent />
      </EditorLayout>
    </>
  );
}

export default EditorRoute