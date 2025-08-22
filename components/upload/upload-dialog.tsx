"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DocumentUploader } from "./document-uploader"
import { DocumentList } from "./document-list"
import { Upload } from "lucide-react"

export function UploadDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-heading">Document Management</DialogTitle>
          <DialogDescription>Upload and manage your documents for AI-powered analysis and chat.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload New</TabsTrigger>
            <TabsTrigger value="manage">Manage Documents</TabsTrigger>
          </TabsList>
          <TabsContent value="upload" className="space-y-4">
            <DocumentUploader onUploadComplete={() => setOpen(false)} />
          </TabsContent>
          <TabsContent value="manage" className="space-y-4">
            <DocumentList />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
