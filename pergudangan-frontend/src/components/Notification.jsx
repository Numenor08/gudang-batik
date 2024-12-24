import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const notificationVariants = cva(
  "fixed bottom-4 right-4 w-full max-w-sm overflow-hidden rounded-lg shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-background border",
        success: "bg-green-500 text-white",
        error: "bg-red-500 text-white",
        warning: "bg-yellow-500 text-white",
        info: "bg-blue-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export function Notification({
  className,
  variant,
  title,
  message,
  duration = 5000,
  onClose,
  ...props
}) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  return (
    <div
      className={cn(notificationVariants({ variant }), className)}
      role="alert"
      {...props}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-1">
            <h3 className="text-sm font-medium">{title}</h3>
            <div className="mt-1 text-sm">{message}</div>
          </div>
          <button
            onClick={() => {
              setIsVisible(false)
              onClose?.()
            }}
            className="ml-4 inline-flex shrink-0 rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            <span className="sr-only">Close</span>
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

