import React, { useState } from 'react'
import { Modal, Card, CardContent, CardHeader, TextField, Button, Stack, Typography, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

type Props = {
  isOpen: boolean
  onClose: Function
  onLogin: Function
}

const cardStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 24,
  p: 4,
};

const loginTextStyle = {
  textAlign: 'center',
  textDecoration: 'underline',
  color: '#1565c0'
}

const SignUpCard = ({ isOpen, onClose, onLogin }: Props) => {
  const [token, setToken] = useState()

  const handleClose = () => {
    onClose()
  } 

  const openLogin = () => {
    onLogin(true)
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
    >
      <Card sx={cardStyle}>
        <CardHeader
          title="Sign Up"
          action={
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Stack spacing={2}>
            <TextField label="Email"></TextField>
            <TextField label="Username"></TextField>
            <TextField label="Password" type={'password'}></TextField>
            <TextField label="Confirm Password" type={'password'}></TextField>
            <Typography variant="subtitle2" sx={loginTextStyle} onClick={openLogin}>
              Login
            </Typography>
            <Button variant="contained">
              Create Account
            </Button>
            {/* <Stack direction={'row'} justifyContent='space-between'>
              <Button variant="contained">
                Sign Up
              </Button>
            </Stack> */}
          </Stack>
        </CardContent>
      </Card>
      
    </Modal>
  )
}

export default SignUpCard
