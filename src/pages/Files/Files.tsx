import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

import CreateFileCard from 'src/components/CreateFileCard/CreateFileCard'

import { createFile } from 'src/api/services/files'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'

const Files = () => {
  const [createFileCard, setCreateFileCard] = useState(false)
  let navigate = useNavigate()

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
            {generate(
              <div>
                <ListItem>
                  <ListItemIcon>
                    <InsertDriveFileIcon />
                  </ListItemIcon>
                  <ListItemText primary="File" />
                </ListItem>
                <Divider />
              </div>
            )}
          </List>
        </Grid>
      </Container>
      <CreateFileCard isOpen={createFileCard} onClose={handleCloseCreateCard} />
    </div>
  )
}

export default Files
