"use client"

export function SubtitlePanel() {
  return (
    <div className="animate-subtitle-fade flex items-center justify-center">
      <div className="rounded-xl border border-foreground/[0.06] bg-foreground/[0.04] px-6 py-2.5 backdrop-blur-sm md:px-8 md:py-3">
        <span className="animate-breathing text-foreground/60 text-[13px] font-extralight tracking-wider md:text-sm">
          Listening...
        </span>
      </div>
    </div>
  )
}
