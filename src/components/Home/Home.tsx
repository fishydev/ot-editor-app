import React from "react";
import { Container, Stack, Typography, Button, TextField, Grid } from "@mui/material"
import styles from "./Home.module.scss"

const Home = () => {
  return (
    <div className={styles.home}>
      <Container sx={{ height: "90vh", pt: 8, pb: 4 }} maxWidth="md">
        <Stack spacing={4}>
        <Typography variant="h3" align="center">
              Collaborative Text Editor using Operational Transformation
            </Typography>
            <Grid item sx={{ textAlign: "center" }}>
              <Button href="/editor" sx={{ width: "200px" }} variant="contained">
                Create New File
              </Button>
            </Grid>
            <Typography variant="h5" align="center">
              ...or edit an existing file
            </Typography>
            <Stack direction="row" spacing={2}>
              <TextField fullWidth sx={{ backgroundColor: "#DDDDDD" }} variant="outlined" label="Type in file code">
              </TextField>
              <Button href="/editor" variant="contained" color="success">Go</Button>
            </Stack>
        </Stack>
      </Container>
    </div>
  )
}

export default Home