import { useCallback, useRef, useState } from 'react'
import Header from './components/Header'
import TopicForm from './components/TopicForm'
import PipelineProgress from './components/PipelineProgress'
import ResultsPanel from './components/ResultsPanel'
import { PIPELINE_STEPS } from './constants/pipeline'
import { buildMockResults } from './utils/mockResults'

const STEP_MS = 700

export default function App() {
  const [topic, setTopic] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(-1)
  const [isComplete, setIsComplete] = useState(false)
  const [results, setResults] = useState(null)
  const [activeTab, setActiveTab] = useState('script')
  const timersRef = useRef([])

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }, [])

  const handleGenerate = useCallback(() => {
    const trimmed = topic.trim()
    if (!trimmed || isGenerating) return

    clearTimers()
    setIsGenerating(true)
    setIsComplete(false)
    setResults(null)
    setCurrentStepIndex(0)
    setActiveTab('script')

    PIPELINE_STEPS.forEach((_, index) => {
      const timer = setTimeout(() => {
        setCurrentStepIndex(index)
        if (index === PIPELINE_STEPS.length - 1) {
          setResults(buildMockResults(trimmed))
          setIsGenerating(false)
          setIsComplete(true)
        }
      }, index * STEP_MS)
      timersRef.current.push(timer)
    })
  }, [topic, isGenerating, clearTimers])

  return (
    <div className="flex min-h-svh flex-col">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-8 text-center sm:mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-400/90">
            AI Story Agent
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Turn a &quot;What if&quot; into a short
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-zinc-500">
            Script, scenes, image prompts, voiceover, and subtitles—one pipeline.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-8">
          <aside className="space-y-6">
            <TopicForm
              topic={topic}
              onTopicChange={setTopic}
              onSubmit={handleGenerate}
              isGenerating={isGenerating}
              disabled={!topic.trim()}
            />
            <PipelineProgress
              currentStepIndex={currentStepIndex}
              isGenerating={isGenerating}
              isComplete={isComplete}
            />
          </aside>

          <ResultsPanel
            activeTab={activeTab}
            onTabChange={setActiveTab}
            results={results}
            hasResults={Boolean(results)}
          />
        </div>
      </main>

      <footer className="border-t border-white/8 py-4 text-center text-xs text-zinc-600">
        Backend not connected — UI preview with mock pipeline timing
      </footer>
    </div>
  )
}
