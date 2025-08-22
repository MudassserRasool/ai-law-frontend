"use client"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { setCurrentSession, setSearchQuery, createNewSession } from "@/store/slices/chatSlice"
import { setSidebarOpen } from "@/store/slices/uiSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Search, Plus, MessageSquare, X } from "lucide-react"

export function Sidebar() {
  const { sessions, currentSessionId, searchQuery } = useAppSelector((state) => state.chat)
  const { sidebarOpen } = useAppSelector((state) => state.ui)
  const dispatch = useAppDispatch()

  const filteredSessions = sessions.filter((session) => session.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleSessionClick = (sessionId: string) => {
    dispatch(setCurrentSession(sessionId))
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      dispatch(setSidebarOpen(false))
    }
  }

  const handleNewChat = () => {
    dispatch(createNewSession())
    if (window.innerWidth < 1024) {
      dispatch(setSidebarOpen(false))
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => dispatch(setSidebarOpen(false))}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-80 transform bg-sidebar border-r border-sidebar-border transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            <h2 className="text-lg font-heading font-semibold text-sidebar-foreground">Chat History</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(setSidebarOpen(false))}
              className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* New chat button */}
          <div className="p-4">
            <Button
              onClick={handleNewChat}
              className="w-full bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Chat
            </Button>
          </div>

          {/* Search */}
          <div className="px-4 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sidebar-foreground/60" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="pl-9 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/60"
              />
            </div>
          </div>

          {/* Chat sessions */}
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-2">
              {filteredSessions.map((session) => (
                <Button
                  key={session.id}
                  variant="ghost"
                  onClick={() => handleSessionClick(session.id)}
                  className={cn(
                    "w-full justify-start text-left h-auto p-3 text-sidebar-foreground hover:bg-sidebar-accent",
                    currentSessionId === session.id && "bg-sidebar-accent text-sidebar-accent-foreground",
                  )}
                >
                  <MessageSquare className="mr-2 h-4 w-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium">{session.title}</p>
                    <p className="text-xs text-sidebar-foreground/60 mt-1">{session.messages.length} messages</p>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </aside>
    </>
  )
}
