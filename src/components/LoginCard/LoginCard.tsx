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
  onClickSignUp: Function
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

const signUpTextStyle = {
  textAlign: 'center',
  textDecoration: 'underline',
  color: '#1565c0',
}

const LoginCard = ({ isOpen, onClose, onClickSignUp, onLogin }: Props) => {
  const [token, setToken] = useState()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isBusyLogin, setIsBusyLogin] = useState(false)

  const handleClose = () => {
    onClose()
  }

  const openSignUp = () => {
    onClickSignUp(true)
  }

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const submitLogin = async () => {
    let payload = {
      username: username,
      password: password,
    }

    try {
      setIsBusyLogin(true)
      const loginResponse = await postLogin(payload)
      onLogin(loginResponse.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsBusyLogin(false)
    }

    // console.log(`loginResponse`)
    // console.log(loginResponse)
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
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
            <Typography variant="subtitle2" sx={signUpTextStyle} onClick={openSignUp}>
              Sign Up
            </Typography>
            <LoadingButton
              loading={isBusyLogin}
              variant="contained"
              onClick={submitLogin}
            >
              Login
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

export default LoginCard
