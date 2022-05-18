import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Menu,
  IconButton,
  Button,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'

type HeaderProps = {
  handleShowLogin: Function
  handleShowLogout: Function
}

const Header = ({ handleShowLogin, handleShowLogout }: HeaderProps) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

  let button

  if (isLoggedIn) {
    button = (
      <Button variant="contained" onClick={() => handleShowLogout(true)}>
        Logout
      </Button>
    )
  } else {
    button = (
      <Button variant="contained" onClick={() => handleShowLogin(true)}>
        Login
      </Button>
    )
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#DDDDDD' }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component={'div'}
            sx={{
              mr: 2,
              display: { md: 'flex', color: '#000000', flexGrow: 1 },
            }}
          >
            OT Editor
          </Typography>
          {button}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
