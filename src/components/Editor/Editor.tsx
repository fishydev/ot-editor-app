import React, { MutableRefObject, useState, useEffect, useRef } from 'react'
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
import { EditorState, basicSetup } from '@codemirror/basic-setup'

const SOCKET_ENDPOINT = 'http://localhost:8999'

type EditorProps = {
  uuid: string
}

const EditorComponent = ({ uuid }: EditorProps) => {
  const [response, setResponse] = useState('')
  const [username, setUsername] = useState(
    useAppSelector((state) => state.auth.userData.username)
  )
  const [doc, setDoc] = useState<Text | null>(null)
  const [version, setVersion] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const socketClientRef = useRef<Socket>()

  const editorRef = useRef<HTMLDivElement | undefined>()

  const userData = {
    userId: useAppSelector((state) => state.auth.userData.userId),
    username: useAppSelector((state) => state.auth.userData.username),
  }

  const openedFileUuid = useAppSelector((state) => state.file.openedFileUuid)
  const openedFile = useAppSelector((state) => state.file.openedFile)

  const pushUpdates = async (
    version: number,
    fullUpdates: readonly Update[]
  ): Promise<boolean> => {
    let updates = fullUpdates.map((u) => ({
      clientId: u.clientID,
      changes: u.changes.toJSON(),
    }))

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

  const pullUpdates = async (version: number): Promise<readonly Update[]> => {
    setLoading(true)
    console.log(`pullUpdates req sent`)
    return await new Promise((resolve) => {
      socketClientRef.current?.emit('pullUpdates', { version: version }, (data: any) => {
        // console.log('pullUpdates res')
        // console.log(data)
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

  const getDocument = async (
    uuid: string | null
  ): Promise<{ version: number; doc: Text }> => {
    return await new Promise((resolve) => {
      socketClientRef.current?.emit(
        'getDocument',
        { filename: openedFile.filename, username: username, uuid: openedFile.uuid },
        (data: any) => {
          setVersion(data.version)
          setDoc(Text.of(data.doc.split('\n')))
          setLoading(false)
          // console.log(`state in getDocument()`)
          // console.log(`version: ${version}`)
          // console.log(`content: ${doc}`)

          resolve(data)
        }
      )
    })
  }

  const getClientExtension = (startVersion: number) => {
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
          await pushUpdates(version, updates)
          this.pushing = false

          if (sendableUpdates(this.view.state).length) {
            setTimeout(() => this.push(), 5000)
          }
        }

        async pull() {
          while (!this.done && !this.pushing) {
            let version = getSyncedVersion(this.view.state)
            console.log(`pull() called, version: ${version}`)
            let updates = await pullUpdates(version)
            // console.log(`new update: ${updates.length} updates`)
            console.log(`pull() return data`)
            console.log(updates)
            if (updates.length > 0) {
              this.view.dispatch(receiveUpdates(this.view.state, updates))
            }
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
    const socket = socketIOClient(SOCKET_ENDPOINT, {
      transports: ['websocket'],
      query: {
        fileId: openedFile.fileId,
        uuid: openedFile.uuid,
        userId: userData.userId,
        username: userData.username,
      },
    })
    // socket.on('FromAPI', (data) => {
    //   setResponse(data)
    //   console.log(response)
    // })

    // socket.emit('openFile', { uuid: openedFileUuid, user: userData })

    socketClientRef.current = socket

    // syncFile(true)
    let state: EditorState
    let view: EditorView
    getDocument(openedFileUuid).then((data) => {
      console.log(`data in useEffect()`)
      console.log(`version: ${data.version}`)
      console.log(`content: ${data.doc}`)
      setDoc(data.doc)
      setVersion(data.version)
      state = EditorState.create({
        doc: data.doc,
        extensions: [basicSetup, getClientExtension(data.version)],
      })

      view = new EditorView({ state, parent: editorRef?.current })
    })
    // const state = EditorState.create({
    //   doc: doc ? doc : 'failed to fetch file',
    //   extensions: [basicSetup, getClientExtension(version ? version : 0)],
    // })

    // const view = new EditorView({ state, parent: editorRef?.current })

    console.log({
      uuid: openedFileUuid,
      user: userData,
    })

    // socketClientRef.current.emit('openFile', {
    //   fileId: openedFileId,
    //   user: userData,
    // })
    return () => {
      socketClientRef.current?.disconnect()
      view.destroy()
    }

    // setInterval(() => {
    //   socket.emit("syncReq", id)
    // }, 10000)
  }, [])

  return (
    <React.Fragment>
      <div ref={editorRef as React.RefObject<HTMLDivElement>}></div>
      <Fab href="/" sx={{ position: 'fixed', bottom: '20px', left: '20px' }}>
        <ArrowBackIosNewIcon />
      </Fab>
      <Fab
        onClick={() => (version ? pullUpdates(version) : {})}
        sx={{ position: 'fixed', bottom: '20px', right: '20px' }}
      >
        <SyncIcon />
      </Fab>
    </React.Fragment>
  )
}

export default EditorComponent
