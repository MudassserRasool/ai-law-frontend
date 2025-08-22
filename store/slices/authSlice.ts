import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface User {
  id: string
  email: string
  name: string
}

interface AuthState {
  isAuthenticated: boolean
  token: string | null
  user: User | null
  role: "user" | "admin" | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
  role: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        token: string
        user: User
        role: "user" | "admin"
      }>,
    ) => {
      state.isAuthenticated = true
      state.token = action.payload.token
      state.user = action.payload.user
      state.role = action.payload.role
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.token = null
      state.user = null
      state.role = null
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
