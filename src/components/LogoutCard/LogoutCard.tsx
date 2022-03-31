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
import { postLogin } from 'src/api/services/auth'
import { Login } from 'src/interfaces/auth'
import { LoadingButton } from '@mui/lab'

type Props = {
  isOpen: boolean
  onClose: Function
  onLogout: Function
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

const LogoutCard = ({ isOpen, onClose, onLogout }: Props) => {
  const handleClose = () => {
    onClose()
  }

  const submitLogout = async () => {
    onLogout()
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Card sx={cardStyle}>
        <CardHeader
          title="Logout"
          action={
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Stack spacing={2}>
            <Typography>Confirm Logout?</Typography>
            <LoadingButton variant="contained" onClick={submitLogout}>
              Logout
            </LoadingButton>
          </Stack>
        </CardContent>
      </Card>
    </Modal>
  )
}

export default LogoutCard
