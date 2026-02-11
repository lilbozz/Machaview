"use client"

export function DangerAlertMode() {
  return (
    <div className="relative h-full w-full">
      {/* Red edge glow */}
      <div
        className="animate-danger-pulse pointer-events-none absolute inset-0"
        style={{
          boxShadow: "inset 0 0 80px 20px rgba(220, 38, 38, 0.15)",
        }}
      />

      {/* Alert content - center */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        {/* Warning icon */}
        <div className="animate-slide-up">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            className="text-red-500/60"
            aria-label="Danger detected"
          >
            <path
              d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Alert card */}
        <div className="animate-slide-up max-w-xs rounded-2xl border border-red-500/[0.12] bg-red-500/[0.04] px-6 py-4 backdrop-blur-md">
          <p className="text-center text-[10px] font-light tracking-widest text-red-400/60 uppercase">
            Object detected
          </p>
          <p className="mt-2 text-center text-sm font-light leading-relaxed tracking-wide text-foreground/65">
            Vehicle approaching from the left at high speed
          </p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <div className="h-1 w-1 animate-rec-blink rounded-full bg-red-500/50" />
            <span className="text-[9px] font-light tracking-widest text-red-400/40 uppercase">
              Stay alert
            </span>
          </div>
        </div>

        {/* Detected label overlay */}
        <div className="absolute left-8 top-1/3 flex items-center gap-2 md:left-16">
          <div className="h-px w-8 bg-red-500/20" />
          <span className="rounded-md border border-red-500/[0.1] bg-red-500/[0.05] px-2.5 py-1 text-[9px] font-light tracking-widest text-red-400/50 uppercase backdrop-blur-sm">
            Vehicle - 12m
          </span>
        </div>
      </div>
    </div>
  )
}
