import React from "react";
import { Typography } from "@mui/material";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Made by Fishydev
      </Typography>
    </footer>
  )
}

export default Footer