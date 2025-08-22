"use client"

import type React from "react"

import { useState } from "react"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { addMessage } from "@/store/slices/chatSlice"
import { useSendMessageMutation } from "@/store/api/chatApi"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { UploadDialog } from "@/components/upload/upload-dialog"
import { Send, Loader2 } from "lucide-react"

interface ChatInputProps {
  onMessageSent?: () => void
}

export function ChatInput({ onMessageSent }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const { currentSessionId } = useAppSelector((state) => state.chat)
  const { selectedCountry, chatMode, searchWebEnabled } = useAppSelector((state) => state.ui)
  const { documents } = useAppSelector((state) => state.documents)
  const dispatch = useAppDispatch()
  const [sendMessage, { isLoading }] = useSendMessageMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim() || !currentSessionId || isLoading) return

    const userMessage = {
      content: message.trim(),
      role: "user" as const,
      timestamp: new Date(),
    }

    // Add user message immediately
    dispatch(addMessage({ sessionId: currentSessionId, message: userMessage }))

    try {
      // Send message to API with document context
      const response = await sendMessage({
        message: message.trim(),
        sessionId: currentSessionId,
        country: selectedCountry,
        mode: chatMode,
        searchWeb: searchWebEnabled,
        documentIds: documents.map((doc) => doc.id),
      }).unwrap()

      // Build AI response content
      let aiContent = response.message
      if (response.webResults) {
        aiContent += `\n\n${response.webResults}`
      }
      if (response.documentResults && response.documentResults.length > 0) {
        aiContent += `\n\nDocument excerpts:\n${response.documentResults
          .map((result) => `• ${result.filename}: ${result.excerpt}`)
          .join("\n")}`
      }

      // Add AI response
      const aiMessage = {
        content: aiContent,
        role: "assistant" as const,
        timestamp: new Date(),
        sources: response.sources,
      }

      dispatch(addMessage({ sessionId: currentSessionId, message: aiMessage }))

      onMessageSent?.()
    } catch (error) {
      console.error("Failed to send message:", error)

      // Add error message
      const errorMessage = {
        content: "Sorry, I encountered an error processing your message. Please try again.",
        role: "assistant" as const,
        timestamp: new Date(),
      }

      dispatch(addMessage({ sessionId: currentSessionId, message: errorMessage }))
    }

    setMessage("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <UploadDialog />
          {documents.length > 0 && (
            <span className="text-xs text-muted-foreground">
              {documents.length} document{documents.length !== 1 ? "s" : ""} available for queries
            </span>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
          className="min-h-[60px] max-h-32 resize-none"
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="icon"
          disabled={!message.trim() || isLoading}
          className="h-[60px] w-12 flex-shrink-0"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </Card>
  )
}
