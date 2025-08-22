"use client"

import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { setChatMode, setSearchWebEnabled } from "@/store/slices/uiSlice"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"

export function Footer() {
  const { chatMode, searchWebEnabled } = useAppSelector((state) => state.ui)
  const dispatch = useAppDispatch()

  return (
    <footer className="border-t border-border bg-card p-4">
      <Card className="p-4">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center space-x-2">
            <Switch
              id="chat-mode"
              checked={chatMode === "hybrid"}
              onCheckedChange={(checked) => dispatch(setChatMode(checked ? "hybrid" : "ai-only"))}
            />
            <Label htmlFor="chat-mode" className="text-sm font-medium">
              {chatMode === "hybrid" ? "Hybrid (AI + Web)" : "AI-only"}
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="search-web"
              checked={searchWebEnabled}
              onCheckedChange={(checked) => dispatch(setSearchWebEnabled(checked))}
            />
            <Label htmlFor="search-web" className="text-sm font-medium">
              Search Web
            </Label>
          </div>
        </div>
      </Card>
    </footer>
  )
}
