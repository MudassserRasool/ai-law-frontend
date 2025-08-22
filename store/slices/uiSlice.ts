import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UiState {
  sidebarOpen: boolean
  selectedCountry: string
  chatMode: "ai-only" | "hybrid"
  searchWebEnabled: boolean
}

const initialState: UiState = {
  sidebarOpen: true,
  selectedCountry: "US",
  chatMode: "ai-only",
  searchWebEnabled: false,
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    setSelectedCountry: (state, action: PayloadAction<string>) => {
      state.selectedCountry = action.payload
    },
    setChatMode: (state, action: PayloadAction<"ai-only" | "hybrid">) => {
      state.chatMode = action.payload
    },
    setSearchWebEnabled: (state, action: PayloadAction<boolean>) => {
      state.searchWebEnabled = action.payload
    },
  },
})

export const { toggleSidebar, setSidebarOpen, setSelectedCountry, setChatMode, setSearchWebEnabled } = uiSlice.actions
export default uiSlice.reducer
