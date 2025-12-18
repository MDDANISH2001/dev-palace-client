import React from "react";

export const CTAIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => {
  return (
    <svg
      viewBox="0 0 600 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Floating abstract shapes */}
      <circle
        cx="480"
        cy="80"
        r="60"
        fill="url(#grad1)"
        opacity="0.2"
        className="animate-pulse"
      />
      <circle
        cx="100"
        cy="320"
        r="40"
        fill="url(#grad2)"
        opacity="0.2"
        className="animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Code editor window */}
      <rect
        x="80"
        y="80"
        width="440"
        height="260"
        rx="16"
        fill="#0f172a"
        opacity="0.95"
      />
      <rect x="80" y="80" width="440" height="36" rx="16" fill="#1e293b" />

      {/* Window controls */}
      <circle cx="100" cy="98" r="5" fill="#ef4444" />
      <circle cx="118" cy="98" r="5" fill="#f59e0b" />
      <circle cx="136" cy="98" r="5" fill="#10b981" />

      {/* Code lines with gradient */}
      <g opacity="0.9">
        <rect
          x="100"
          y="140"
          width="160"
          height="10"
          rx="5"
          fill="url(#grad1)"
        />
        <rect
          x="100"
          y="165"
          width="240"
          height="10"
          rx="5"
          fill="url(#grad2)"
        />
        <rect
          x="100"
          y="190"
          width="200"
          height="10"
          rx="5"
          fill="url(#grad1)"
        />
        <rect
          x="100"
          y="215"
          width="280"
          height="10"
          rx="5"
          fill="url(#grad2)"
        />
        <rect
          x="100"
          y="240"
          width="140"
          height="10"
          rx="5"
          fill="url(#grad1)"
        />
        <rect
          x="100"
          y="265"
          width="220"
          height="10"
          rx="5"
          fill="url(#grad2)"
        />
        <rect
          x="100"
          y="290"
          width="180"
          height="10"
          rx="5"
          fill="url(#grad1)"
        />
      </g>

      {/* Collaboration icons */}
      <circle cx="450" cy="200" r="30" fill="url(#grad1)" opacity="0.8" />
      <circle cx="480" cy="240" r="25" fill="url(#grad2)" opacity="0.8" />
      <circle cx="420" cy="250" r="28" fill="url(#grad1)" opacity="0.7" />

      {/* Connection lines */}
      <line
        x1="450"
        y1="200"
        x2="480"
        y2="240"
        stroke="url(#grad2)"
        strokeWidth="3"
        opacity="0.5"
      />
      <line
        x1="450"
        y1="200"
        x2="420"
        y2="250"
        stroke="url(#grad1)"
        strokeWidth="3"
        opacity="0.5"
      />
    </svg>
  );
};

export default CTAIllustration;
