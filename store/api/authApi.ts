import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
}

export interface AuthResponse {
  success: boolean
  token: string
  role: "user" | "admin"
  user: {
    id: string
    email: string
    name: string
  }
}

// Mock delay function
const mockDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/auth",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      queryFn: async (credentials) => {
        await mockDelay(1000) // Simulate network delay

        // Mock successful login
        if (credentials.email && credentials.password) {
          const isAdmin = credentials.email.includes("admin")
          return {
            data: {
              success: true,
              token: "mock-jwt-token-" + Date.now(),
              role: isAdmin ? "admin" : "user",
              user: {
                id: "user-" + Date.now(),
                email: credentials.email,
                name: credentials.email.split("@")[0],
              },
            },
          }
        }

        return {
          error: {
            status: 401,
            data: { message: "Invalid credentials" },
          },
        }
      },
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      queryFn: async (userData) => {
        await mockDelay(1000)

        if (userData.email && userData.password && userData.name) {
          return {
            data: {
              success: true,
              token: "mock-jwt-token-" + Date.now(),
              role: "user",
              user: {
                id: "user-" + Date.now(),
                email: userData.email,
                name: userData.name,
              },
            },
          }
        }

        return {
          error: {
            status: 400,
            data: { message: "Registration failed" },
          },
        }
      },
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = authApi
