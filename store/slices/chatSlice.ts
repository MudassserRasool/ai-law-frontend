import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface ChatMessage {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  sources?: string[]
}

export interface ChatSession {
  id: string
  title: string
  messages: ChatMessage[]
  createdAt: Date
  updatedAt: Date
}

interface ChatState {
  sessions: ChatSession[]
  currentSessionId: string | null
  searchQuery: string
}

const initialState: ChatState = {
  sessions: [
    {
      id: "session-1",
      title: "Chat on Aug 21, 2025 - 10:00 AM",
      messages: [
        {
          id: "msg-1",
          content: "Hello! How can I help you today?",
          role: "assistant",
          timestamp: new Date("2025-08-21T10:00:00"),
        },
      ],
      createdAt: new Date("2025-08-21T10:00:00"),
      updatedAt: new Date("2025-08-21T10:00:00"),
    },
    {
      id: "session-2",
      title: "Document Analysis - Aug 20, 2025",
      messages: [
        {
          id: "msg-2",
          content: "I'd like to analyze this document",
          role: "user",
          timestamp: new Date("2025-08-20T14:30:00"),
        },
      ],
      createdAt: new Date("2025-08-20T14:30:00"),
      updatedAt: new Date("2025-08-20T14:30:00"),
    },
  ],
  currentSessionId: "session-1",
  searchQuery: "",
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentSession: (state, action: PayloadAction<string>) => {
      state.currentSessionId = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    addMessage: (state, action: PayloadAction<{ sessionId: string; message: Omit<ChatMessage, "id"> }>) => {
      const session = state.sessions.find((s) => s.id === action.payload.sessionId)
      if (session) {
        const newMessage: ChatMessage = {
          ...action.payload.message,
          id: `msg-${Date.now()}`,
        }
        session.messages.push(newMessage)
        session.updatedAt = new Date()
      }
    },
    createNewSession: (state) => {
      const newSession: ChatSession = {
        id: `session-${Date.now()}`,
        title: `Chat on ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`,
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      state.sessions.unshift(newSession)
      state.currentSessionId = newSession.id
    },
  },
})

export const { setCurrentSession, setSearchQuery, addMessage, createNewSession } = chatSlice.actions
export default chatSlice.reducer
