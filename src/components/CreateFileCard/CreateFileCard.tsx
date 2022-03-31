import React, { useState } from 'react'
import {
  Modal,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Stack,
  Typography,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { createFile } from 'src/api/services/files'
import { Login } from 'src/interfaces/auth'
import { LoadingButton } from '@mui/lab'

type Props = {
  isOpen: boolean
  onClose: Function
  onCreate: Function
}

const cardStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 24,
  p: 4,
}

const CreateFileCard = ({ isOpen, onClose, onCreate }: Props) => {
  const [filename, setFilename] = useState('')
  const [isBusyCreate, setIsBusyCreate] = useState(false)

  const handleClose = () => {
    onClose()
  }

  const handleChangeFilename = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilename(event.target.value)
  }

  const submitCreateFile = async () => {
    try {
      setIsBusyCreate(true)

      const payload = {
        filename: filename,
      }

      const createFileResponse = await createFile(payload)
    } catch (error) {
      console.log(error)
    } finally {
      setIsBusyCreate(false)
      onCreate()
    }
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Card sx={cardStyle}>
        <CardHeader
          title="Create File"
          action={
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Stack spacing={2}>
            <TextField
              label="Filename"
              value={filename}
              onChange={handleChangeFilename}
            ></TextField>
            <LoadingButton
              loading={isBusyCreate}
              variant="contained"
              onClick={submitCreateFile}
              disabled={!filename}
            >
              Create File
            </LoadingButton>
          </Stack>
        </CardContent>
      </Card>
    </Modal>
  )
}

export default CreateFileCard
