"use client"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, User } from "lucide-react"
import type { ChatMessage } from "@/store/slices/chatSlice"

interface MessageBubbleProps {
  message: ChatMessage
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user"
  const isAssistant = message.role === "assistant"

  return (
    <div className={cn("flex gap-3 max-w-4xl", isUser ? "ml-auto flex-row-reverse" : "mr-auto")}>
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarFallback
          className={cn(isUser ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground")}
        >
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>

      <div className={cn("flex flex-col gap-2", isUser ? "items-end" : "items-start")}>
        <Card
          className={cn(
            "p-3 max-w-2xl",
            isUser ? "bg-accent text-accent-foreground" : "bg-card text-card-foreground border-border",
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>

          {message.sources && message.sources.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border/50">
              <p className="text-xs text-muted-foreground mb-2">Sources:</p>
              <div className="flex flex-wrap gap-1">
                {message.sources.map((source, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    Source {index + 1}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </Card>

        <span className="text-xs text-muted-foreground">{new Date(message.timestamp).toLocaleTimeString()}</span>
      </div>
    </div>
  )
}
