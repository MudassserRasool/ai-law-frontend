"use client"

import { useEffect, useRef } from "react"
import { useAppSelector } from "@/store/hooks"
import { MessageBubble } from "./message-bubble"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"

export function ChatWindow() {
  const { sessions, currentSessionId } = useAppSelector((state) => state.chat)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const currentSession = sessions.find((session) => session.id === currentSessionId)

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [currentSession?.messages])

  if (!currentSession) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto" />
          <h3 className="text-lg font-heading font-semibold text-foreground">No Chat Selected</h3>
          <p className="text-muted-foreground max-w-md">
            Select a conversation from the sidebar or start a new chat to begin.
          </p>
        </div>
      </div>
    )
  }

  return (
    <Card className="flex-1 flex flex-col m-4 overflow-hidden">
      <div className="p-4 border-b border-border">
        <h2 className="font-heading font-semibold text-foreground">{currentSession.title}</h2>
        <p className="text-sm text-muted-foreground">
          {currentSession.messages.length} messages • Last updated {new Date(currentSession.updatedAt).toLocaleString()}
        </p>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        {currentSession.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">Start the conversation by typing a message below.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {currentSession.messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>
    </Card>
  )
}
