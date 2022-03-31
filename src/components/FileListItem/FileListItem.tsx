import React from 'react'
import { ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'

type Props = {
  filename: string
}

const FileListItem = ({ filename }: Props) => {
  return (
    <div>
      <ListItem>
        <ListItemIcon>
          <InsertDriveFileIcon />
        </ListItemIcon>
        <ListItemText primary={filename} />
      </ListItem>
      <Divider />
    </div>
  )
}

export default FileListItem
