"use client"

import { cn } from "@/lib/utils"

import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { removeDocument } from "@/store/slices/documentsSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Trash2, Calendar } from "lucide-react"

export function DocumentList() {
  const { documents } = useAppSelector((state) => state.documents)
  const dispatch = useAppDispatch()

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileTypeColor = (fileType: string) => {
    if (fileType.includes("pdf")) return "bg-red-100 text-red-800"
    if (fileType.includes("word")) return "bg-blue-100 text-blue-800"
    if (fileType.includes("text")) return "bg-green-100 text-green-800"
    return "bg-gray-100 text-gray-800"
  }

  if (documents.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <FileText className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">No documents uploaded yet</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-heading">Uploaded Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64">
          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{doc.filename}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className={cn("text-xs", getFileTypeColor(doc.fileType))}>
                          {doc.fileType.split("/")[1]?.toUpperCase() || "FILE"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{formatFileSize(doc.fileSize)}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => dispatch(removeDocument(doc.id))}
                      className="h-6 w-6 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{doc.summary}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
