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
import { LoadingButton } from '@mui/lab'
import { postSignUp } from 'src/api/services/auth'

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
}

const loginTextStyle = {
  textAlign: 'center',
  textDecoration: 'underline',
  color: '#1565c0',
}

const SignUpCard = ({ isOpen, onClose, onLogin }: Props) => {
  const [token, setToken] = useState()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isBusySignUp, setIsBusySignUp] = useState(false)

  const handleClose = () => {
    onClose()
  }

  const openLogin = () => {
    onLogin(true)
  }

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const handleChangeConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value)
  }

  const submitSignUp = async () => {
    let payload = {
      email: email,
      username: username,
      password: password,
      // confirmPassword: confirmPassword
    }

    try {
      setIsBusySignUp(true)
      const signUpResponse = await postSignUp(payload)
      handleClose()
    } catch (error) {
      console.log(error)
    } finally {
      setIsBusySignUp(false)
    }

    // console.log(`loginResponse`)
    // console.log(loginResponse)
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
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
            <TextField
              label="Email"
              value={email}
              onChange={handleChangeEmail}
            ></TextField>
            <TextField
              label="Username"
              value={username}
              onChange={handleChangeUsername}
            ></TextField>
            <TextField
              label="Password"
              type={'password'}
              value={password}
              onChange={handleChangePassword}
            ></TextField>
            <TextField
              label="Confirm Password"
              type={'password'}
              onChange={handleChangeConfirmPassword}
            ></TextField>
            <Typography variant="subtitle2" sx={loginTextStyle} onClick={openLogin}>
              Login
            </Typography>
            <LoadingButton variant="contained" onClick={submitSignUp}>
              Create Account
            </LoadingButton>
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
