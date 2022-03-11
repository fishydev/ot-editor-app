import React from 'react'
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Menu,
  IconButton,
  Tooltip,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'

const Header = () => {
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
              display: { xs: 'none', md: 'flex', color: '#000000', flexGrow: 1 },
            }}
          >
            OT Editor
          </Typography>
          <Tooltip title="3 users are editing this file">
            <PersonIcon sx={{ color: 'black' }} />
          </Tooltip>
          <Typography variant="subtitle2" sx={{ color: 'black' }}>
            3
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
