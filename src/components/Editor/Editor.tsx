import React, { MutableRefObject, useState, useEffect, useRef } from 'react'
import socketIOClient, { Socket } from 'socket.io-client'
import { Fab } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import SyncIcon from '@mui/icons-material/Sync'
import { ChangeSet, Extension, Text } from '@codemirror/state'
import { getClientExtension } from './CodeMirrorExtension'
import { EditorState, basicSetup } from '@codemirror/basic-setup'
import { EditorView, ViewPlugin, ViewUpdate } from '@codemirror/view'
import CodeMirror from '@uiw/react-codemirror'

const SOCKET_ENDPOINT = 'http://localhost:8999'

const EditorComponent = () => {
  const [username, setUsername] = useState('')
  const [doc, setDoc] = useState<Text | null>(null)
  const [version, setVersion] = useState<number | null>(null)
  const [clientExtension, setClientExtension] = useState<Extension[] | null>(null)
  const [loading, setLoading] = useState(false)

  const socketClientRef = useRef<Socket>()
  const editorRef = useRef<HTMLDivElement | undefined>()

  const getDocument = async (
    socket: Socket
  ): Promise<{ version: number; doc: string[] }> => {
    setLoading(true)
    return await new Promise((resolve) => {
      socket.emit('getDocument', {}, (data: any) => {
        // setVersion(data.version)
        // setDoc(data.doc)
        setLoading(false)

        resolve(data)
      })
    })
  }

  useEffect(() => {
    const socket = socketIOClient(SOCKET_ENDPOINT, {
      transports: ['websocket'],
      query: {
        username: 'user1',
      },
    })

    socketClientRef.current = socket

    let state: EditorState
    let view: EditorView

    getDocument(socket).then((data) => {
      setClientExtension(getClientExtension(data.version, socket))

      console.log(data)

      state = EditorState.create({
        doc: Text.of(data.doc),
        extensions: [basicSetup, getClientExtension(data.version, socket)],
      })

      view = new EditorView({ state, parent: editorRef?.current })
    })
  }, [])

  return (
    <React.Fragment>
      <div ref={editorRef as React.RefObject<HTMLDivElement>}></div>
    </React.Fragment>
  )
}

export default EditorComponent
