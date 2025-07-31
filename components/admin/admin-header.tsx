"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Settings, User, LogOut, Shield, Home, MessageCircle, Phone, Mail, Clock, Check, X, Trash2, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface Message {
  id: string
  firstname: string
  lastname: string
  email: string
  phone?: string
  msg: string
  subject?: string
  inquiryType?: string
  read: boolean
  createdAt: string
  priority?: 'low' | 'medium' | 'high'
}

export default function AdminHeader() {
  const [msgs, setMsgs] = useState<Message[]>([])
  const [isDataUpdated, setIsDataUpdated] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const fetchMsgs = async () => {
      try {
        const response = await fetch("/api/message")
        const data = await response.json()
        if (data.msgs) {
          setMsgs(data.msgs)
          setIsDataUpdated(true)
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error)
      }
    }
    fetchMsgs()
  }, [])

  const unreadCount = msgs.filter(msg => !msg.read).length

  const handleMarkAsRead = async (messageId: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/message/${messageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true, id: messageId })
      })
      
      if (response.ok) {
        setMsgs(prev => prev.map(msg =>
          msg.id === messageId ? { ...msg, read: true } : msg
        ))
        toast.success("Message marked as read")
      }
    } catch (error) {
      toast.error("Failed to mark message as read.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteMessage = async (messageId: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/message/${messageId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setMsgs(prev => prev.filter(msg => msg.id !== messageId))
        setSelectedMessage(null)
        toast.success("Message deleted successfully.")
      }
    } catch (error) {
      toast.error("Failed to delete message.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleMarkAllAsRead = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/message', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true })
      })
      
      if (response.ok) {
        setMsgs(prev => prev.map(msg => ({ ...msg, read: true })))
        toast.success("All messages marked as read successfully.")
      }
    } catch (error) {
      toast.error("Failed to mark all messages as read.")
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Today'
    if (diffDays === 2) return 'Yesterday'
    if (diffDays <= 7) return `${diffDays - 1} days ago`
    return date.toLocaleDateString()
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-xs text-gray-500">AhmedSeCarLo</p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Home Button */}
            <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
              <Home className="h-5 w-5" />
            </Button>
            
            {/* Notifications */}
            <Dialog open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              
              <DialogContent className="max-w-4xl w-[95vw] h-[90vh] p-0">
                <DialogHeader className="p-6 pb-4 border-b">
                  <div className="flex items-center justify-between">
                    <DialogTitle className="text-xl font-bold flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-blue-600" />
                      User Messages ({msgs.length})
                    </DialogTitle>
                    {unreadCount > 0 && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleMarkAllAsRead}
                        disabled={isLoading}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Mark All Read
                      </Button>
                    )}
                  </div>
                </DialogHeader>

                <div className="flex h-full">
                  {/* Messages List */}
                  <div className="w-1/2 border-r">
                    <ScrollArea className="h-[calc(90vh-100px)]">
                      <div className="p-4 space-y-2">
                        {msgs.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">
                            <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No messages yet</p>
                          </div>
                        ) : (
                          msgs.map((msg) => (
                            <div
                              key={msg.id}
                              onClick={() => setSelectedMessage(msg)}
                              className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                                selectedMessage?.id === msg.id 
                                  ? 'border-blue-500 bg-blue-50' 
                                  : msg.read 
                                    ? 'border-gray-200 bg-white' 
                                    : 'border-gray-300 bg-gray-50'
                              }`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${msg.firstname} ${msg.lastname}`} />
                                    <AvatarFallback>
                                      {msg.firstname[0]}{msg.lastname[0]}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium text-sm">{msg.firstname} {msg.lastname}</p>
                                    <p className="text-xs text-gray-500">{msg.email}</p>
                                    {msg.inquiryType && (
                                      <p className="text-xs text-blue-600 font-medium">{msg.inquiryType}</p>
                                    )}
                                  </div>
                                </div>
                                {!msg.read && (
                                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                )}
                              </div>
                              
                              {/* Subject line if available */}
                              {msg.subject && (
                                <p className="text-sm font-medium text-gray-800 mb-1 line-clamp-1">
                                  {msg.subject}
                                </p>
                              )}
                              
                              <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                                {msg.msg}
                              </p>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <Clock className="h-3 w-3" />
                                  {formatDate(msg.createdAt)}
                                </div>
                                {msg.priority && (
                                  <Badge className={`text-xs ${getPriorityColor(msg.priority)}`}>
                                    {msg.priority}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </ScrollArea>
                  </div>

                  {/* Message Detail */}
                  <div className="w-1/2 flex flex-col">
                    {selectedMessage ? (
                      <>
                        <div className="p-6 border-b">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedMessage.firstname} ${selectedMessage.lastname}`} />
                                <AvatarFallback>
                                  {selectedMessage.firstname[0]}{selectedMessage.lastname[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{selectedMessage.firstname} {selectedMessage.lastname}</h3>
                                <p className="text-sm text-gray-600">{selectedMessage.email}</p>
                                {selectedMessage.phone && (
                                  <p className="text-sm text-gray-600">{selectedMessage.phone}</p>
                                )}
                                {selectedMessage.inquiryType && (
                                  <Badge variant="secondary" className="mt-1 text-xs">
                                    {selectedMessage.inquiryType}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {!selectedMessage.read && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleMarkAsRead(selectedMessage.id)}
                                  disabled={isLoading}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  Mark Read
                                </Button>
                              )}
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteMessage(selectedMessage.id)}
                                disabled={isLoading}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          {/* Subject */}
                          {selectedMessage.subject && (
                            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-600 mb-1">Subject:</p>
                              <p className="font-medium text-gray-900">{selectedMessage.subject}</p>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {new Date(selectedMessage.createdAt).toLocaleString()}
                            </div>
                            {selectedMessage.priority && (
                              <Badge className={getPriorityColor(selectedMessage.priority)}>
                                {selectedMessage.priority} priority
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <ScrollArea className="flex-1 p-6">
                          <div className="prose max-w-none">
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Message:</h4>
                              <div className="bg-white p-4 rounded-lg border">
                                <p className="whitespace-pre-wrap text-gray-900 leading-relaxed">
                                  {selectedMessage.msg}
                                </p>
                              </div>
                            </div>
                            
                            {/* Contact Information */}
                            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                              <h4 className="text-sm font-medium text-blue-900 mb-3">Contact Information</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4 text-blue-600" />
                                  <span className="text-gray-700">
                                    {selectedMessage.firstname} {selectedMessage.lastname}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4 text-blue-600" />
                                  <a 
                                    href={`mailto:${selectedMessage.email}`}
                                    className="text-blue-600 hover:underline"
                                  >
                                    {selectedMessage.email}
                                  </a>
                                </div>
                                {selectedMessage.phone && (
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-blue-600" />
                                    <a 
                                      href={`tel:${selectedMessage.phone}`}
                                      className="text-blue-600 hover:underline"
                                    >
                                      {selectedMessage.phone}
                                    </a>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </ScrollArea>
                      </>
                    ) : (
                      <div className="flex-1 flex items-center justify-center text-gray-500">
                        <div className="text-center">
                          <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Select a message to view details</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Admin Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="hidden md:block">Admin</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600" 
                  onClick={() => { 
                    fetch('/api/admin/logout', { method: 'POST' })
                    router.push('/admin/login') 
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
