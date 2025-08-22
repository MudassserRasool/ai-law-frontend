"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { useUploadDocumentMutation } from "@/store/api/uploadApi"
import { startUpload, setUploadProgress, addDocument } from "@/store/slices/documentsSlice"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { Upload, FileText, X } from "lucide-react"

interface DocumentUploaderProps {
  onUploadComplete?: () => void
}

export function DocumentUploader({ onUploadComplete }: DocumentUploaderProps) {
  const [uploadDocument] = useUploadDocumentMutation()
  const { isUploading, uploadProgress } = useAppSelector((state) => state.documents)
  const dispatch = useAppDispatch()
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return

      const file = acceptedFiles[0]
      setError(null)
      dispatch(startUpload())

      try {
        // Simulate upload progress
        const progressInterval = setInterval(() => {
          dispatch(setUploadProgress((prev) => Math.min(prev + 10, 90)))
        }, 200)

        const result = await uploadDocument({ file }).unwrap()

        clearInterval(progressInterval)
        dispatch(setUploadProgress(100))

        // Add document to store
        const newDocument = {
          id: result.fileId,
          filename: result.filename,
          summary: result.summary,
          uploadedAt: new Date(),
          fileSize: file.size,
          fileType: file.type,
        }

        setTimeout(() => {
          dispatch(addDocument(newDocument))
          onUploadComplete?.()
        }, 500)
      } catch (err) {
        setError("Failed to upload document. Please try again.")
        dispatch(setUploadProgress(0))
      }
    },
    [uploadDocument, dispatch, onUploadComplete],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "text/plain": [".txt"],
    },
    maxFiles: 1,
    disabled: isUploading,
  })

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              isDragActive ? "border-accent bg-accent/10" : "border-border hover:border-accent/50",
              isUploading && "cursor-not-allowed opacity-50",
            )}
          >
            <input {...getInputProps()} />
            <div className="space-y-4">
              {isUploading ? (
                <>
                  <Upload className="h-8 w-8 mx-auto text-accent animate-pulse" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Uploading document...</p>
                    <Progress value={uploadProgress} className="w-full max-w-xs mx-auto" />
                    <p className="text-xs text-muted-foreground">{uploadProgress}% complete</p>
                  </div>
                </>
              ) : (
                <>
                  <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      {isDragActive ? "Drop your document here" : "Drag & drop a document here"}
                    </p>
                    <p className="text-xs text-muted-foreground">or click to browse files</p>
                    <p className="text-xs text-muted-foreground">Supports PDF, DOCX, and TXT files</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <X className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
