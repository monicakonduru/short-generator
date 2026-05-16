const TABS = [
  { id: 'script', label: 'Script' },
  { id: 'scenes', label: 'Scenes' },
  { id: 'prompts', label: 'Image prompts' },
  { id: 'voice', label: 'Voiceover' },
  { id: 'subtitles', label: 'Subtitles' },
]

export default function ResultsPanel({
  activeTab,
  onTabChange,
  results,
  hasResults,
}) {
  return (
    <section className="flex min-h-[420px] flex-col rounded-2xl border border-white/10 bg-white/[0.03] sm:min-h-[520px]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-3 sm:px-5">
        <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
          Output
        </h2>
        {hasResults && (
          <button
            type="button"
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-white/10"
          >
            Export all
          </button>
        )}
      </div>

      <div
        role="tablist"
        className="flex gap-1 overflow-x-auto border-b border-white/10 px-2 py-2 sm:px-3"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              activeTab === tab.id
                ? 'bg-violet-500/20 text-violet-200'
                : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-4 sm:p-5">
        {!hasResults ? (
          <EmptyState />
        ) : (
          <TabContent tab={activeTab} results={results} />
        )}
      </div>
    </section>
  )
}

function EmptyState() {
  return (
    <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] text-2xl text-zinc-600">
        ▶
      </div>
      <p className="text-sm font-medium text-zinc-400">No output yet</p>
      <p className="mt-1 max-w-xs text-xs text-zinc-600">
        Enter a topic and hit Generate. Results will appear here as each pipeline
        step completes.
      </p>
    </div>
  )
}

function TabContent({ tab, results }) {
  const content = {
    script: results.script,
    scenes: results.scenes,
    prompts: results.imagePrompts,
    voice: results.voiceover,
    subtitles: results.subtitles,
  }[tab]

  if (tab === 'scenes' && Array.isArray(content)) {
    return (
      <ul className="space-y-3">
        {content.map((scene) => (
          <li
            key={scene.id}
            className="rounded-xl border border-white/8 bg-[#0d0e14] p-4"
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-violet-400">
                Scene {scene.id}
              </span>
              <span className="font-mono text-xs text-zinc-500">{scene.duration}</span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-300">{scene.text}</p>
          </li>
        ))}
      </ul>
    )
  }

  if (tab === 'prompts' && Array.isArray(content)) {
    return (
      <ul className="space-y-3">
        {content.map((item) => (
          <li
            key={item.sceneId}
            className="rounded-xl border border-white/8 bg-[#0d0e14] p-4"
          >
            <span className="text-xs font-medium text-violet-400">
              Scene {item.sceneId}
            </span>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.prompt}</p>
          </li>
        ))}
      </ul>
    )
  }

  if (tab === 'voice') {
    return (
      <div className="space-y-4">
        <p className="text-sm text-zinc-400">{content?.status}</p>
        <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-[#0d0e14] p-4">
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white"
            aria-label="Play preview"
          >
            ▶
          </button>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
            <span className="block h-full w-1/3 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
          </div>
          <span className="font-mono text-xs text-zinc-500">{content?.duration}</span>
        </div>
        <p className="text-xs text-zinc-600">{content?.note}</p>
      </div>
    )
  }

  if (tab === 'subtitles' && typeof content === 'string') {
    return (
      <pre className="whitespace-pre-wrap rounded-xl border border-white/8 bg-[#0d0e14] p-4 font-mono text-xs leading-relaxed text-zinc-400">
        {content}
      </pre>
    )
  }

  return (
    <p className="text-sm leading-relaxed whitespace-pre-wrap text-zinc-300">
      {content}
    </p>
  )
}
