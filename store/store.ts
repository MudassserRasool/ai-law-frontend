import { configureStore } from "@reduxjs/toolkit"
import { authApi } from "./api/authApi"
import { chatApi } from "./api/chatApi"
import { uploadApi } from "./api/uploadApi"
import { adminApi } from "./api/adminApi"
import authReducer from "./slices/authSlice"
import chatReducer from "./slices/chatSlice"
import uiReducer from "./slices/uiSlice"
import documentsReducer from "./slices/documentsSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    ui: uiReducer,
    documents: documentsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, chatApi.middleware, uploadApi.middleware, adminApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
