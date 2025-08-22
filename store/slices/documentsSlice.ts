import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface UploadedDocument {
  id: string
  filename: string
  summary: string
  uploadedAt: Date
  fileSize: number
  fileType: string
}

interface DocumentsState {
  documents: UploadedDocument[]
  isUploading: boolean
  uploadProgress: number
}

const initialState: DocumentsState = {
  documents: [],
  isUploading: false,
  uploadProgress: 0,
}

const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    setUploadProgress: (state, action: PayloadAction<number>) => {
      state.uploadProgress = action.payload
      state.isUploading = action.payload < 100
    },
    addDocument: (state, action: PayloadAction<UploadedDocument>) => {
      state.documents.unshift(action.payload)
      state.isUploading = false
      state.uploadProgress = 0
    },
    removeDocument: (state, action: PayloadAction<string>) => {
      state.documents = state.documents.filter((doc) => doc.id !== action.payload)
    },
    startUpload: (state) => {
      state.isUploading = true
      state.uploadProgress = 0
    },
  },
})

export const { setUploadProgress, addDocument, removeDocument, startUpload } = documentsSlice.actions
export default documentsSlice.reducer
