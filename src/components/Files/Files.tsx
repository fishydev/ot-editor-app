import React, { useState, useEffect } from 'react'
import { Container, Grid, List, Button, TextField } from '@mui/material'
import { useAppSelector } from 'src/redux/hooks'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'src/redux/hooks'

import CreateFileCard from 'src/components/CreateFileCard/CreateFileCard'
import FileListItem from 'src/components/FileListItem/FileListItem'

import { getFileList, getFilesByUsername } from 'src/api/services/files'

import { IFileListItem, IOpenedFile } from 'src/interfaces/files'
import { setOpenedFileUuid, setOpenedFile } from 'src/redux/files/fileSlice'

const Files = () => {
  const [createFileCard, setCreateFileCard] = useState(false)
  const [usernameQuery, setUsernameQuery] = useState('')
  const [username, setUsername] = useState(
    useAppSelector((state) => state.auth.userData.username)
  )
  const [fileList, setFileList] = useState([] as IFileListItem[])
  let navigate = useNavigate()
  let dispatch = useAppDispatch()

  useEffect(() => {
    loadFileList()
  }, [])

  const loadFileList = async () => {
    try {
      const getResponse = await getFilesByUsername(username)
      setFileList(getResponse.data)
    } catch (error) {
      //
    }
  }

  const handleShowCreate = async (show: boolean) => {
    setCreateFileCard(show)
  }

  const handleCloseCreateCard = () => {
    setCreateFileCard(false)
  }

  const handleChangeUsernameQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameQuery(event.target.value)
  }

  const createdFileHandler = () => {
    setCreateFileCard(false)
    loadFileList()
  }

  const openFile = (file: IFileListItem) => {
    navigate(`/files/${file.uuid}`)
    dispatch(setOpenedFileUuid(file.uuid))
    dispatch(setOpenedFile(file))
  }

  const searchByUsername = async () => {
    try {
      const getResponse = await getFilesByUsername(usernameQuery)
      setFileList(getResponse.data)
    } catch (error) {
      //
    }
  }

  return (
    <div>
      <Container sx={{ height: '90vh', pt: 8, pb: 4 }} maxWidth="md">
        <Grid container spacing={2}>
          <Grid container direction="row" justifyContent="space-between">
            <Button variant="contained" onClick={() => handleShowCreate(true)}>
              Create
            </Button>
            <div>
              <TextField
                label="Username"
                size="small"
                value={usernameQuery}
                sx={{
                  marginRight: 2,
                }}
                onChange={handleChangeUsernameQuery}
              ></TextField>
              <Button variant="outlined" onClick={() => searchByUsername()}>
                Search
              </Button>
            </div>
          </Grid>
          <List
            sx={{
              bgcolor: 'background.paper',
              width: '100%',
            }}
          >
            {fileList.map((item, index) => {
              return (
                <FileListItem
                  key={item.fileId}
                  filename={item.filename}
                  fileId={item.fileId}
                  uuid={item.uuid}
                  onOpenFile={() => openFile(item)}
                  onDeletedFile={() => loadFileList()}
                />
              )
            })}
          </List>
        </Grid>
      </Container>
      <CreateFileCard
        isOpen={createFileCard}
        onClose={handleCloseCreateCard}
        onCreate={createdFileHandler}
      />
    </div>
  )
}

export default Files
