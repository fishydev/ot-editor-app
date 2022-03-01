import React from "react"
import Editor from "@monaco-editor/react"
import { Fab } from "@mui/material"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const EditorComponent = () => {
  return (
    <React.Fragment>
      <Editor
        height="90vh"
        defaultValue="type something!"
      />
      <Fab href="/" sx={{ position: "fixed", bottom: "20px", left: "20px" }}>
        <ArrowBackIosNewIcon />
      </Fab>
    </React.Fragment>
  )
}

export default EditorComponent