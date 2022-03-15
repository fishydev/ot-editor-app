import React from "react"
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  Modal,
  Card,
  CardContent,
  TextField,
  Stack,
} from "@mui/material"
import LoginCard from "src/components/LoginCard/LoginCard"

const Header = () => {
  const [loginDialog, setLoginDialog] = React.useState(false)
  const handleOpenLogin = () => setLoginDialog(true)
  const handleCloseLogin = () => setLoginDialog(false)

  return (
    <React.Fragment>
      <AppBar position="static" sx={{ backgroundColor: "#DDDDDD" }}>
        <Container maxWidth="xl">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component={"div"}
              sx={{
                mr: 2,
                display: {
                  xs: "none",
                  md: "flex",
                  color: "#000000",
                  flexGrow: 1,
                },
              }}
            >
              OT Editor
            </Typography>
            <Button variant="contained" onClick={handleOpenLogin}>
              Login
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Modal open={loginDialog} onClose={handleCloseLogin}>
        <LoginCard />
      </Modal>
    </React.Fragment>
  )
}

export default Header
