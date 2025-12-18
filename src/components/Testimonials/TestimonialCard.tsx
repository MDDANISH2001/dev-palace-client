import React from "react"
import { FiStar } from "react-icons/fi"
import { cn } from "@/lib/utils"

type TestimonialCardProps = {
  clientName: string
  clientRole: string
  company?: string
  quote: string
  avatarColor: string
  index?: number
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  clientName,
  clientRole,
  company,
  quote,
  avatarColor,
  index = 0,
}) => {
  return (
    <div
      className={cn(
        "relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-lg",
        "transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/30",
        "flex flex-col gap-6 h-full animate-fade-in-up overflow-hidden group"
      )}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Quote mark */}
      <div className="relative">
        <svg
          className="w-12 h-12 text-primary/20 group-hover:text-primary/40 transition-colors duration-300"
          fill="currentColor"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
      </div>

      {/* Quote */}
      <blockquote className="relative text-foreground text-lg leading-relaxed flex-1 italic font-light">
        {quote}
      </blockquote>

      {/* Rating stars */}
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <FiStar key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Client Info */}
      <div className="flex items-center gap-4 relative">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-md ring-2 ring-background group-hover:ring-primary/20 transition-all duration-300"
          style={{ backgroundColor: avatarColor }}
          aria-label={`${clientName} avatar`}
        >
          {clientName.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-bold text-base">{clientName}</p>
          <p className="text-sm text-muted-foreground">
            {clientRole}
            {company && ` • ${company}`}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard
