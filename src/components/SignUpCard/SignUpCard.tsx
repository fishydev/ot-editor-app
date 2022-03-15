import React from "react"
import CloseIcon from "@mui/icons-material/Close"
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Stack,
  IconButton,
} from "@mui/material"

const styleCard = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
  p: 4,
}

const styleCloseButton = {
  position: "absolute" as "absolute",
  right: "40px",
}

const SignUpCard = () => {
  return (
    <Card sx={styleCard}>
      <CardHeader
        action={
          <IconButton sx={styleCloseButton}>
            <CloseIcon />
          </IconButton>
        }
        title="Sign Up"
        sx={{
          textAlign: "center",
        }}
      />
      <CardContent>
        <Stack spacing={4}>
          {/* <Typography
            variant="h5"
            sx={{
              textAlign: "center",
            }}
          >
            SignUp
          </Typography> */}
          <TextField variant="filled" label="Username" size="small"></TextField>
          <TextField variant="filled" label="Email" size="small"></TextField>
          <TextField
            variant="filled"
            label="Password"
            type="password"
            size="small"
          ></TextField>
          <TextField
            variant="filled"
            label="Confirm Password"
            type="password"
            size="small"
          ></TextField>
          <Button variant="contained">Sign Up</Button>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default SignUpCard
