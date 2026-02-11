export function LensVignette({ scanlines = false }: { scanlines?: boolean }) {
  return (
    <>
      {/* Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.7) 100%)",
        }}
      />
      {/* Scanline overlay */}
      {scanlines && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[51] opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.08) 2px, rgba(255,255,255,0.08) 4px)",
            backgroundSize: "100% 4px",
          }}
        />
      )}
    </>
  )
}
