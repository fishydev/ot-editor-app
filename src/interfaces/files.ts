export interface CreateFile {
  filename: string
}

export interface IFileListItem {
  fileId: number
  filename: string,
  uuid: string
}

export interface IOpenedFile {
  fileId: number,
  filename: string,
  uuid: string
}