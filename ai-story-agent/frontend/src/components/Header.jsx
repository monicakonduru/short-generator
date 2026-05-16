export default function Header() {
  return (
    <header className="border-b border-white/8 bg-[#0a0b10]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 text-sm font-bold text-white shadow-lg shadow-violet-500/25">
            SG
          </span>
          <div className="text-left">
            <h1 className="text-base font-semibold tracking-tight text-white sm:text-lg">
              ShortGenerator
            </h1>
            <p className="text-xs text-zinc-500">AI story agent for vertical shorts</p>
          </div>
        </div>
        <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-400 sm:inline">
          React · FastAPI · OpenAI · ElevenLabs
        </span>
      </div>
    </header>
  )
}
