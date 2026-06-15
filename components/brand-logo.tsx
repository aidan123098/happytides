type BrandLogoProps = {
  className?: string
  showText?: boolean
}

export function BrandLogo({ className, showText = true }: BrandLogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <img
        src="/images/leaf-logo.png"
        alt="HappyTides leaf emblem"
        className="h-9 w-16 shrink-0 object-contain object-center sm:w-20"
        style={{ marginLeft: "-13px" }}
      />
      {showText && (
        <div className="leading-none">
          <span className="block font-serif text-2xl font-semibold tracking-tight text-navy" style={{ marginLeft: "-14px" }}>
            HappyTides
          </span>
          <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.32em] text-navy/70" style={{ marginLeft: "-14px" }}>
            Advanced Peptides
          </span>
        </div>
      )}
    </div>
  )
}
