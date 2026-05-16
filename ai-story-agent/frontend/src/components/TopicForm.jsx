import { EXAMPLE_TOPICS } from '../constants/pipeline'

export default function TopicForm({
  topic,
  onTopicChange,
  onSubmit,
  isGenerating,
  disabled,
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
        Your topic
      </h2>
      <p className="mt-1 text-sm text-zinc-400">
        Enter a &quot;What if…&quot; question. The agent will build a full short from it.
      </p>

      <form
        className="mt-4 space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
      >
        <label htmlFor="topic" className="sr-only">
          Video topic
        </label>
        <textarea
          id="topic"
          rows={3}
          value={topic}
          onChange={(e) => onTopicChange(e.target.value)}
          placeholder="What If Earth Lost Oxygen for 5 Seconds?"
          disabled={isGenerating}
          className="w-full resize-none rounded-xl border border-white/10 bg-[#0d0e14] px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 disabled:opacity-60"
        />

        <div className="flex flex-wrap gap-2">
          <span className="w-full text-xs text-zinc-500 sm:w-auto sm:py-2">Try:</span>
          {EXAMPLE_TOPICS.map((example) => (
            <button
              key={example}
              type="button"
              disabled={isGenerating}
              onClick={() => onTopicChange(example)}
              className="rounded-lg border border-white/8 bg-white/5 px-2.5 py-1 text-xs text-zinc-400 transition hover:border-violet-500/30 hover:text-zinc-200 disabled:opacity-50"
            >
              {example.length > 42 ? `${example.slice(0, 42)}…` : example}
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={disabled || isGenerating}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:from-violet-500 hover:to-fuchsia-500 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-w-[200px]"
        >
          {isGenerating ? (
            <>
              <Spinner />
              Generating…
            </>
          ) : (
            'Generate short'
          )}
        </button>
      </form>
    </section>
  )
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}
