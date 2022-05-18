import React, { useState } from 'react'
import { ListItem, ListItemIcon, ListItemText, Divider, IconButton } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteFile } from 'src/api/services/files'

type Props = {
  filename: string
  fileId: number
  uuid: string
  onDeletedFile: Function
  onOpenFile: Function
}

const FileListItem = ({ filename, fileId, uuid, onDeletedFile, onOpenFile }: Props) => {
  const [isBusy, setIsBusy] = useState(false)

  const deleteFileHandler = async (fileId: number) => {
    try {
      setIsBusy(true)
      await deleteFile(fileId)
    } catch (error) {
      console.log(error)
    } finally {
      setIsBusy(false)
      onDeletedFile()
    }
  }

  const openFileHandler = async (uuid: string) => {
    onOpenFile(uuid)
  }

  return (
    <div>
      <ListItem
        secondaryAction={
          <LoadingButton
            loading={isBusy}
            onClick={() => deleteFileHandler(fileId)}
            startIcon={<DeleteIcon />}
          ></LoadingButton>
        }
      >
        <ListItemIcon>
          <InsertDriveFileIcon />
        </ListItemIcon>
        <ListItemText primary={filename} onClick={() => openFileHandler(uuid)} />
      </ListItem>
      <Divider />
    </div>
  )
}

export default FileListItem
