import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Container, Grid, List, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import CreateFileCard from 'src/components/CreateFileCard/CreateFileCard'
import FileListItem from 'src/components/FileListItem/FileListItem'

import { getFileList } from 'src/api/services/files'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'

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

  const generate = (element: React.ReactElement) => {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    )
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
              return <FileListItem key={index} filename={item.filename} />
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
