import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface AdminDocument {
  id: string
  filename: string
  uploadedBy: string
  uploadDate: string
  fileSize: number
  fileType: string
  summary: string
  status: "processed" | "processing" | "error"
}

export interface AdminStats {
  totalUsers: number
  totalDocuments: number
  totalChats: number
  storageUsed: string
}

const mockDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock admin data
const mockDocuments: AdminDocument[] = [
  {
    id: "doc-1",
    filename: "quarterly-report.pdf",
    uploadedBy: "john.doe@example.com",
    uploadDate: "2025-08-21T10:30:00Z",
    fileSize: 2048576,
    fileType: "application/pdf",
    summary: "Q3 2025 financial report with revenue analysis and projections.",
    status: "processed",
  },
  {
    id: "doc-2",
    filename: "user-manual.docx",
    uploadedBy: "jane.smith@example.com",
    uploadDate: "2025-08-20T14:15:00Z",
    fileSize: 1024000,
    fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    summary: "Comprehensive user manual for the AI chat system.",
    status: "processed",
  },
  {
    id: "doc-3",
    filename: "meeting-notes.txt",
    uploadedBy: "admin@example.com",
    uploadDate: "2025-08-19T09:45:00Z",
    fileSize: 15360,
    fileType: "text/plain",
    summary: "Meeting notes from the product strategy session.",
    status: "processing",
  },
]

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin",
  }),
  tagTypes: ["AdminDocument", "AdminStats"],
  endpoints: (builder) => ({
    getAdminStats: builder.query<AdminStats, void>({
      queryFn: async () => {
        await mockDelay(800)
        return {
          data: {
            totalUsers: 1247,
            totalDocuments: mockDocuments.length,
            totalChats: 8934,
            storageUsed: "2.4 GB",
          },
        }
      },
      providesTags: ["AdminStats"],
    }),
    getAllDocuments: builder.query<AdminDocument[], void>({
      queryFn: async () => {
        await mockDelay(1000)
        return { data: mockDocuments }
      },
      providesTags: ["AdminDocument"],
    }),
    deleteDocument: builder.mutation<{ success: boolean }, string>({
      queryFn: async (documentId) => {
        await mockDelay(500)
        const index = mockDocuments.findIndex((doc) => doc.id === documentId)
        if (index !== -1) {
          mockDocuments.splice(index, 1)
          return { data: { success: true } }
        }
        return { error: { status: 404, data: { message: "Document not found" } } }
      },
      invalidatesTags: ["AdminDocument", "AdminStats"],
    }),
  }),
})

export const { useGetAdminStatsQuery, useGetAllDocumentsQuery, useDeleteDocumentMutation } = adminApi
