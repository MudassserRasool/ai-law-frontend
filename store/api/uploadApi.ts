import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface UploadRequest {
  file: File
}

export interface UploadResponse {
  fileId: string
  filename: string
  summary: string
  embedded: boolean
}

export interface VectorSearchRequest {
  query: string
  fileIds?: string[]
}

export interface VectorSearchResponse {
  results: Array<{
    content: string
    filename: string
    score: number
  }>
}

const mockDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const uploadApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/upload",
  }),
  endpoints: (builder) => ({
    uploadDocument: builder.mutation<UploadResponse, UploadRequest>({
      queryFn: async (request) => {
        await mockDelay(2000)

        return {
          data: {
            fileId: `file-${Date.now()}`,
            filename: request.file.name,
            summary: `Mock summary of ${request.file.name}: This document contains important information that has been processed and indexed for semantic search.`,
            embedded: true,
          },
        }
      },
    }),
    vectorSearch: builder.mutation<VectorSearchResponse, VectorSearchRequest>({
      queryFn: async (request) => {
        await mockDelay(1000)

        return {
          data: {
            results: [
              {
                content: `Mock search result for "${request.query}" from uploaded documents.`,
                filename: "example-document.pdf",
                score: 0.95,
              },
            ],
          },
        }
      },
    }),
  }),
})

export const { useUploadDocumentMutation, useVectorSearchMutation } = uploadApi
