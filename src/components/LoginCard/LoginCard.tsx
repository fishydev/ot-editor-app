import React, { useState } from 'react'
import { Modal, Card, CardContent, CardHeader, TextField, Button, Stack, Typography, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

type Props = {
  isOpen: boolean
  onClose: Function
  onSignUp: Function
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

const signUpTextStyle = {
  textAlign: 'center',
  textDecoration: 'underline',
  color: '#1565c0'
}

const LoginCard = ({ isOpen, onClose, onSignUp }: Props) => {
  const [token, setToken] = useState()

  const handleClose = () => {
    onClose()
  }

  const openSignUp = () => {
    onSignUp(true)
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
    >
      <Card sx={cardStyle}>
        <CardHeader
          title="Login"
          action={
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Stack spacing={2}>
            <TextField label="Username"></TextField>
            <TextField label="Password" type={'password'}></TextField>
            <Typography variant="subtitle2" sx={signUpTextStyle} onClick={openSignUp}>
              Sign Up
            </Typography>
            <Button variant="contained">
              Login
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

export default LoginCard
