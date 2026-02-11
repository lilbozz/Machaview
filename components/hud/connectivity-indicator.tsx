"use client"

export function ConnectivityIndicator() {
  return (
    <div className="flex items-center gap-1.5">
      {/* WiFi icon */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        className="text-foreground/50"
        aria-label="WiFi connected"
      >
        <path
          d="M12 19.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
          fill="currentColor"
        />
        <path
          d="M8.46 15.54a5 5 0 017.08 0"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M5.29 12.37a9 9 0 0113.42 0"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M2.1 9.21a13 13 0 0119.8 0"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-[10px] font-light tracking-wider text-foreground/40">
        5G
      </span>
    </div>
  )
}
