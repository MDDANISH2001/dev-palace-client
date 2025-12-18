/**
 * Notification Bell Component
 * Displays notification icon with unread badge and drawer with notification list
 */

import React, { useState } from "react";
import { FaBell, FaCheck, FaTrashAlt } from "react-icons/fa";
import { useNotificationStore } from "@/store/useNotificationStore";
import { useSocketContext } from "@/socket/hooks/useSocketContext";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface NotificationBellProps {
  className?: string;
  onNotificationClick?: (
    notificationId: string,
    data?: Record<string, unknown>
  ) => void;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({
  className,
  onNotificationClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, isConnected } = useNotificationStore();
  const { notifications: notificationSocket } = useSocketContext();

  const handleNotificationClick = (
    notificationId: string,
    data?: Record<string, unknown>
  ) => {
    // Mark as read
    notificationSocket.markAsRead(notificationId);

    // Call custom handler if provided
    if (onNotificationClick) {
      onNotificationClick(notificationId, data);
    }
  };

  const handleMarkAllAsRead = () => {
    notificationSocket.markAllAsRead();
  };

  const handleDeleteNotification = (
    e: React.MouseEvent,
    notificationId: string
  ) => {
    e.stopPropagation();
    notificationSocket.deleteNotification(notificationId);
  };

  const getNotificationIcon = () => {
    // You can add more icons based on notification type
    // For now, returning a default icon
    return "🔔";
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    return date.toLocaleDateString();
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("relative", className)}
          aria-label="Notifications"
        >
          <FaBell className="h-5 w-5 text-muted-foreground" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
          {!isConnected && (
            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-yellow-500" />
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarkAllAsRead}
                className="text-xs"
              >
                <FaCheck className="h-4 w-4 mr-1" />
                Mark all read
              </Button>
            )}
          </SheetTitle>
          <SheetDescription>
            {isConnected ? (
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Connected
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-yellow-500" />
                Reconnecting...
              </span>
            )}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-2">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FaBell className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground">
                No notifications yet
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() =>
                    handleNotificationClick(notification.id, notification.data)
                  }
                  className={cn(
                    "group relative flex gap-3 p-4 rounded-lg border cursor-pointer transition-colors hover:bg-accent",
                    !notification.read && "bg-accent/50 border-primary/20"
                  )}
                >
                  {/* Notification Icon */}
                  <div className="shrink-0 text-2xl">
                    {getNotificationIcon()}
                  </div>

                  {/* Notification Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold line-clamp-1">
                        {notification.title}
                      </h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) =>
                          handleDeleteNotification(e, notification.id)
                        }
                      >
                        <FaTrashAlt className="h-3 w-3" />
                      </Button>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {notification.message}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                      {!notification.read && (
                        <Badge variant="secondary" className="text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Unread indicator */}
                  {!notification.read && (
                    <div className="absolute top-4 left-1 h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
