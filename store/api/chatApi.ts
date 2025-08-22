import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface ChatRequest {
  message: string
  sessionId: string
  country: string
  mode: "ai-only" | "hybrid"
  searchWeb: boolean
  documentIds?: string[]
}

export interface ChatResponse {
  message: string
  sources?: string[]
  webResults?: string
  documentResults?: Array<{
    filename: string
    excerpt: string
    relevance: number
  }>
}

const mockDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/chat",
  }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation<ChatResponse, ChatRequest>({
      queryFn: async (request) => {
        await mockDelay(1500)

        let response = `Mock AI response to: "${request.message}"`

        if (request.country !== "US") {
          response += ` (Context: ${request.country})`
        }

        const mockResponse: ChatResponse = {
          message: response,
        }

        // Check if message might be asking about documents
        const documentKeywords = ["document", "file", "pdf", "analyze", "summary", "content"]
        const hasDocumentQuery = documentKeywords.some((keyword) => request.message.toLowerCase().includes(keyword))

        if (hasDocumentQuery && request.documentIds && request.documentIds.length > 0) {
          mockResponse.documentResults = [
            {
              filename: "example-document.pdf",
              excerpt: `Mock excerpt from your document related to "${request.message}". This shows relevant content found through semantic search.`,
              relevance: 0.95,
            },
          ]
          mockResponse.message = `Based on your uploaded documents: ${mockResponse.message}\n\nI found relevant information in your documents (see sources below).`
        }

        if (request.mode === "hybrid" || request.searchWeb) {
          mockResponse.webResults = "Web results: Mock search snippet related to your query."
          mockResponse.sources = ["https://example.com/source1", "https://example.com/source2"]
        }

        return { data: mockResponse }
      },
    }),
  }),
})

export const { useSendMessageMutation } = chatApi
