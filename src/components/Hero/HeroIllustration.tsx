import React from "react"

export const HeroIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      {/* Abstract monitor and code blocks */}
      <rect x="40" y="80" width="720" height="380" rx="20" fill="#0f172a" opacity="0.95" />
      <rect x="68" y="110" width="664" height="320" rx="10" fill="#020617" />

      {/* code lines */}
      <g fill="#0ea5e9" opacity="0.95">
        <rect x="90" y="140" width="420" height="12" rx="6" />
        <rect x="90" y="166" width="540" height="12" rx="6" />
        <rect x="90" y="192" width="300" height="12" rx="6" />
        <rect x="90" y="218" width="480" height="12" rx="6" />
        <rect x="90" y="244" width="200" height="12" rx="6" />
      </g>

      {/* side panel */}
      <rect x="530" y="140" width="160" height="160" rx="8" fill="url(#g1)" opacity="0.95" />

      {/* keyboard */}
      <rect x="140" y="420" width="320" height="18" rx="4" fill="#0b1220" />
      <rect x="220" y="432" width="80" height="6" rx="3" fill="#334155" />

      {/* floating circles */}
      <circle cx="640" cy="90" r="34" fill="#0ea5e9" opacity="0.12" />
      <circle cx="720" cy="150" r="22" fill="#7c3aed" opacity="0.12" />
    </svg>
  )
}

export default HeroIllustration
