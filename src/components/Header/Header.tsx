import React from 'react'
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
}

const Header = ({ handleShowLogin }: HeaderProps) => {
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
          <Button variant='contained' onClick={() => handleShowLogin(true)}>Login</Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
