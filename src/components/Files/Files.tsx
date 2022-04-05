import React, { useState, useEffect } from 'react'
import { Container, Grid, List, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import CreateFileCard from 'src/components/CreateFileCard/CreateFileCard'
import FileListItem from 'src/components/FileListItem/FileListItem'

import { getFileList } from 'src/api/services/files'

import { IFileListItem } from 'src/interfaces/files'

const Files = () => {
  const [createFileCard, setCreateFileCard] = useState(false)
  const [fileList, setFileList] = useState([] as IFileListItem[])
  let navigate = useNavigate()

  useEffect(() => {
    loadFileList()
  }, [])

  const loadFileList = async () => {
    try {
      const getResponse = await getFileList()
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

  const createdFileHandler = () => {
    setCreateFileCard(false)
    loadFileList()
  }

  const openFile = (filename: string) => {
    navigate(`/files/${filename}`)
  }

  return (
    <div>
      <Container sx={{ height: '90vh', pt: 8, pb: 4 }} maxWidth="md">
        <Grid container spacing={2}>
          <Button variant="contained" onClick={() => handleShowCreate(true)} sx={{}}>
            Create
          </Button>
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
                  onOpenFile={(filename: string) => openFile(filename)}
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
