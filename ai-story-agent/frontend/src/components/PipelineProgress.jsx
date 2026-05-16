import { PIPELINE_STEPS } from '../constants/pipeline'

const STATUS = {
  pending: 'pending',
  active: 'active',
  done: 'done',
}

function stepStatus(index, currentIndex, isGenerating, isComplete) {
  if (isComplete) return STATUS.done
  if (!isGenerating && currentIndex < 0) return STATUS.pending
  if (index < currentIndex) return STATUS.done
  if (index === currentIndex && isGenerating) return STATUS.active
  if (index <= currentIndex && !isGenerating && currentIndex >= 0) return STATUS.done
  return STATUS.pending
}

export default function PipelineProgress({
  currentStepIndex,
  isGenerating,
  isComplete,
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
        Pipeline
      </h2>
      <ol className="mt-4 space-y-0">
        {PIPELINE_STEPS.map((step, index) => {
          const status = stepStatus(
            index,
            currentStepIndex,
            isGenerating,
            isComplete,
          )
          const isLast = index === PIPELINE_STEPS.length - 1

          return (
            <li key={step.id} className="relative flex gap-3 pb-6 last:pb-0">
              {!isLast && (
                <span
                  className={`absolute left-[11px] top-7 h-[calc(100%-12px)] w-px ${
                    status === STATUS.done ? 'bg-violet-500/60' : 'bg-white/10'
                  }`}
                  aria-hidden
                />
              )}
              <StepIcon status={status} />
              <div className="min-w-0 flex-1 pt-0.5">
                <p
                  className={`text-sm font-medium ${
                    status === STATUS.active
                      ? 'text-violet-300'
                      : status === STATUS.done
                        ? 'text-zinc-200'
                        : 'text-zinc-500'
                  }`}
                >
                  {step.label}
                  {status === STATUS.active && (
                    <span className="ml-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
                  )}
                </p>
                <p className="text-xs text-zinc-500">{step.description}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

function StepIcon({ status }) {
  const base =
    'relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs'

  if (status === STATUS.done) {
    return (
      <span
        className={`${base} border-violet-500/50 bg-violet-500/20 text-violet-300`}
        aria-hidden
      >
        ✓
      </span>
    )
  }

  if (status === STATUS.active) {
    return (
      <span
        className={`${base} border-violet-400 bg-violet-500/30 ring-2 ring-violet-500/30`}
        aria-hidden
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-violet-300" />
      </span>
    )
  }

  return (
    <span
      className={`${base} border-white/15 bg-[#0d0e14] text-zinc-600`}
      aria-hidden
    />
  )
}
