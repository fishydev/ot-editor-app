import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Container, Stack, Typography, Button, TextField, Grid } from "@mui/material"
import styles from "./Home.module.scss"
import { useNavigate } from "react-router-dom"

import { createFile } from "src/api/services/files"

const handleCreateFile = async () => {
  let id = uuidv4()

  try {
    let postRequest = await createFile(id)
    
  } catch (err) {
    console.log(err)
  }
}

const Home = () => {
  const [fileId, setFileId] = useState("")
  let navigate = useNavigate()

  const handleCreateFile = async () => {
    let id = uuidv4()
  
    try {
      let postRequest = await createFile(id)
      navigate(`/editor/${id}`)
      
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.home}>
      <Container sx={{ height: "90vh", pt: 8, pb: 4 }} maxWidth="md">
        <Stack spacing={4}>
        <Typography variant="h3" align="center">
              Collaborative Text Editor using Operational Transformation
            </Typography>
            <Grid item sx={{ textAlign: "center" }}>
              <Button onClick={handleCreateFile} sx={{ width: "200px" }} variant="contained">
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