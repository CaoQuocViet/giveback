import Globe from "@/components/magicui/globe"

export default function GlobePage() {
  return (
    <div className="relative flex size-full max-w-sm items-center justify-center overflow-hidden rounded-lg border bg-background px-8 pb-40 pt-8 sm:max-w-sm sm:px-2 md:max-w-lg md:px-20 md:pb-60 md:shadow-xl lg:max-w-lg">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Kết nối
      </span>
      <Globe className="top-14" />
      <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
    </div>
  )
}
