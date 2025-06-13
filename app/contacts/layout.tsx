import type React from "react"
import ProtectedRoute from "@/components/protected-route"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
//import { AuthProvider } from "../../lib/auth-context"

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   //<AuthProvider>
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
   //</AuthProvider>
  )
}
