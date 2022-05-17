import React, { useState, useEffect, useRef } from 'react'
import socketIOClient, { Socket } from 'socket.io-client'
import { useAppSelector } from 'src/redux/hooks'
import { Fab } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import SyncIcon from '@mui/icons-material/Sync'
import { useLocation } from 'react-router-dom'
import {
  Update,
  receiveUpdates,
  sendableUpdates,
  collab,
  getSyncedVersion,
} from '@codemirror/collab'
import { EditorView, ViewPlugin, ViewUpdate } from '@codemirror/view'
import { ChangeSet, Text } from '@codemirror/state'

const SOCKET_ENDPOINT = 'http://localhost:8999'

type EditorProps = {
  filename: string
}

const EditorComponent = ({ filename }: EditorProps) => {
  const [response, setResponse] = useState('')
  const [username, setUsername] = useState(
    useAppSelector((state) => state.auth.userData.username)
  )
  const [doc, setDoc] = useState<Text | null>(null)
  const [version, setVersion] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const socketClientRef = useRef<Socket>()

  const editorRef = useRef(null)
  const monacoRef = useRef(null)

  const userData = {
    userId: useAppSelector((state) => state.auth.userData.userId),
    username: useAppSelector((state) => state.auth.userData.username),
  }

  const openedFileId = useAppSelector((state) => state.file.openedFileId)

  const pushUpdates = async (
    version: number,
    fullUpdates: readonly Update[]
  ): Promise<boolean> => {
    let updates = fullUpdates.map((u) => ({
      clientId: u.clientID,
      changes: u.changes.toJSON(),
    }))

    socketClientRef.current?.emit('pushUpdates', {
      version: version,
      updates: updates,
    })

    return await new Promise((resolve) => {
      socketClientRef.current?.emit(
        'pushUpdates',
        {
          version: version,
          updates: updates,
        },
        (data: any) => {
          resolve(data)
        }
      )
    })
  }

  const pullUpdates = async (version: number | null): Promise<readonly Update[]> => {
    setLoading(true)

    return await new Promise((resolve) => {
      socketClientRef.current?.emit('pullUpdates', { version: version }, (data: any) => {
        resolve(
          data.updates.map((u: any) => ({
            changes: ChangeSet.fromJSON(u.changes),
            clientId: u.clientID,
          }))
        )

        setLoading(false)
      })
    })
  }

  const getDocument = async (): Promise<{ version: number; doc: Text }> => {
    return await new Promise((resolve) => {
      socketClientRef.current?.emit('getDocument', (data: any) => {
        setVersion(data.version)
        setDoc(Text.of(data.doc.split('\n')))
        setLoading(false)

        resolve(data)
      })
    })
  }

  const getClient = (startVersion: number) => {
    let plugin = ViewPlugin.fromClass(
      class {
        pushing = false
        done = false

        constructor(private view: EditorView) {
          this.pull()
        }

        update(update: ViewUpdate) {
          if (update.docChanged) this.push()
        }

        async push() {
          let updates = sendableUpdates(this.view.state)
          if (this.pushing || !updates.length) {
            this.pushing = true
          }

          let version = getSyncedVersion(this.view.state)
          pushUpdates(version, updates)
          this.pushing = false

          if (sendableUpdates(this.view.state).length) {
            setTimeout(() => this.push(), 100)
          }
        }

        async pull() {
          while (!this.done) {
            let version = getSyncedVersion(this.view.state)
            let updates = await pullUpdates(version)
            this.view.dispatch(receiveUpdates(this.view.state, updates))
          }
        }

        destroy() {
          this.done = true
        }
      }
    )

    return [collab({ startVersion }), plugin]
  }

  useEffect(() => {
    const socket = socketIOClient(SOCKET_ENDPOINT, { transports: ['websocket'] })
    socket.on('FromAPI', (data) => {
      setResponse(data)
      console.log(response)
    })

    socketClientRef.current = socket

    // syncFile(true)
    getDocument()

    console.log({
      fileId: openedFileId,
      user: userData,
    })

    socketClientRef.current.emit('openFile', {
      fileId: openedFileId,
      user: userData,
    })
    return () => {
      socketClientRef.current?.disconnect()
    }

    // setInterval(() => {
    //   socket.emit("syncReq", id)
    // }, 10000)
  }, [])

  return (
    <React.Fragment>
      {/* TODO add CodeMirror */}
      <Fab href="/" sx={{ position: 'fixed', bottom: '20px', left: '20px' }}>
        <ArrowBackIosNewIcon />
      </Fab>
      <Fab
        onClick={() => pullUpdates(version)}
        sx={{ position: 'fixed', bottom: '20px', right: '20px' }}
      >
        <SyncIcon />
      </Fab>
    </React.Fragment>
  )
}

export default EditorComponent
