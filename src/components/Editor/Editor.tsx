import React, { useState, useEffect, useRef } from 'react'
import MonacoEditor, { OnChange } from '@monaco-editor/react'
import socketIOClient, { Socket } from 'socket.io-client'
import { useAppSelector } from 'src/redux/hooks'
import { Fab } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import SyncIcon from '@mui/icons-material/Sync'

const SOCKET_ENDPOINT = 'http://localhost:8999'

type EditorProps = {
  filename: string
}

const EditorComponent = ({ filename }: EditorProps) => {
  const [response, setResponse] = useState('')
  const [username, setUsername] = useState(
    useAppSelector((state) => state.auth.userData.username)
  )
  const [content, setContent] = useState('')
  const socketClientRef = useRef<Socket>()

  const editorRef = useRef(null)

  useEffect(() => {
    const socket = socketIOClient(SOCKET_ENDPOINT, { transports: ['websocket'] })
    socket.on('FromAPI', (data) => {
      setResponse(data)
      console.log(response)
    })
    socket.on('syncRes', (data) => {
      setContent(data)
    })

    socketClientRef.current = socket

    syncFile(true)

    // setInterval(() => {
    //   socket.emit("syncReq", id)
    // }, 10000)
  }, [])

  const syncFile = (firstLoad: boolean) => {
    console.log(typeof content)
    socketClientRef.current?.emit('syncReq', {
      username: username,
      filename: filename,
      content: content,
      firstLoad: firstLoad,
    })
  }

  const onChangeEditor = (newVal: any, e: any) => {
    setContent(newVal)
  }

  return (
    <React.Fragment>
      <MonacoEditor value={content} height="90vh" onChange={onChangeEditor} />
      <Fab href="/" sx={{ position: 'fixed', bottom: '20px', left: '20px' }}>
        <ArrowBackIosNewIcon />
      </Fab>
      <Fab
        onClick={() => syncFile(false)}
        sx={{ position: 'fixed', bottom: '20px', right: '20px' }}
      >
        <SyncIcon />
      </Fab>
    </React.Fragment>
  )
}

export default EditorComponent
