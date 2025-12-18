import React from "react"

export const AuthIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <defs>
        <linearGradient id="authGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="authGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* Background circles */}
      <circle cx="380" cy="120" r="80" fill="url(#authGrad1)" opacity="0.1" />
      <circle cx="100" cy="400" r="60" fill="url(#authGrad2)" opacity="0.1" />
      
      {/* Main screen/monitor */}
      <rect x="80" y="100" width="340" height="240" rx="20" fill="#0f172a" opacity="0.95" />
      <rect x="80" y="100" width="340" height="40" rx="20" fill="#1e293b" />
      
      {/* Window controls */}
      <circle cx="100" cy="120" r="6" fill="#ef4444" />
      <circle cx="120" cy="120" r="6" fill="#f59e0b" />
      <circle cx="140" cy="120" r="6" fill="#10b981" />
      
      {/* Login form representation */}
      <g opacity="0.9">
        {/* Input fields */}
        <rect x="110" y="160" width="260" height="30" rx="8" fill="url(#authGrad1)" opacity="0.3" />
        <rect x="110" y="205" width="260" height="30" rx="8" fill="url(#authGrad1)" opacity="0.3" />
        
        {/* Button */}
        <rect x="110" y="260" width="260" height="40" rx="10" fill="url(#authGrad1)" />
        
        {/* Decorative lines */}
        <rect x="120" y="168" width="40" height="14" rx="4" fill="url(#authGrad2)" />
        <rect x="120" y="213" width="50" height="14" rx="4" fill="url(#authGrad2)" />
      </g>

      {/* User icon */}
      <circle cx="250" cy="380" r="40" fill="url(#authGrad1)" opacity="0.8" />
      <circle cx="250" cy="370" r="15" fill="white" opacity="0.9" />
      <path d="M 225 410 Q 250 395 275 410" fill="white" opacity="0.9" />

      {/* Security/lock icons */}
      <g opacity="0.6">
        <rect x="340" y="380" width="30" height="35" rx="4" fill="url(#authGrad2)" />
        <circle cx="355" cy="370" r="10" stroke="url(#authGrad2)" strokeWidth="3" fill="none" />
      </g>

      {/* Checkmark/success */}
      <circle cx="160" cy="400" r="25" fill="url(#authGrad1)" opacity="0.7" />
      <path d="M 150 400 L 157 407 L 170 390" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default AuthIllustration
