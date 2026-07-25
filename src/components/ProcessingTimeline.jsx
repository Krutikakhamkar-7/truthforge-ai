import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiDatabase, FiCheckSquare, FiFileText, FiCheck } from 'react-icons/fi'

const STAGES = [
  { key: 'research', label: 'Researching', detail: 'Dispatching Research Agent across indexed sources', icon: FiSearch },
  { key: 'collect', label: 'Collecting Sources', detail: 'Aggregating primary and secondary references', icon: FiDatabase },
  { key: 'verify', label: 'Fact Checking', detail: 'Cross-verifying claims against trusted corpora', icon: FiCheckSquare },
  { key: 'report', label: 'Generating Report', detail: 'Synthesizing the final verification report', icon: FiFileText },
]

const STAGE_DURATION_MS = 1400

export default function ProcessingTimeline({ active }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!active) {
      setActiveIndex(0)
      return
    }
    const interval = setInterval(() => {
      setActiveIndex((i) => Math.min(i + 1, STAGES.length - 1))
    }, STAGE_DURATION_MS)
    return () => clearInterval(interval)
  }, [active])

  if (!active) return null

  return (
    <section className="px-6 pb-16">
      <div className="mx-auto max-w-3xl">
        <div className="glass-panel rounded-2xl p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="section-eyebrow mb-1">Pipeline status</p>
              <h3 className="font-display text-xl font-semibold text-mist-50">Verifying your question</h3>
            </div>
            <div className="relative h-10 w-10">
              <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-transparent border-t-brand-light border-r-truth-high" />
            </div>
          </div>

          <div className="relative flex flex-col gap-0">
            {STAGES.map((stage, i) => {
              const done = i < activeIndex
              const current = i === activeIndex
              const Icon = stage.icon
              return (
                <div key={stage.key} className="relative flex gap-4 pb-8 last:pb-0">
                  {i < STAGES.length - 1 && (
                    <div className="absolute left-[19px] top-10 h-full w-px bg-white/10">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: done ? '100%' : '0%' }}
                        transition={{ duration: 0.5 }}
                        className="w-px bg-gradient-to-b from-brand to-truth-high"
                      />
                    </div>
                  )}
                  <div
                    className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ${
                      done
                        ? 'border-truth-high/40 bg-truth-high/15 text-truth-high'
                        : current
                        ? 'border-brand/50 bg-brand/15 text-brand-light'
                        : 'border-white/10 bg-white/[0.02] text-mist-400'
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {done ? (
                        <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <FiCheck className="h-4 w-4" />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="icon"
                          animate={current ? { scale: [1, 1.15, 1] } : {}}
                          transition={{ repeat: current ? Infinity : 0, duration: 1.4 }}
                        >
                          <Icon className="h-4 w-4" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {current && (
                      <span className="absolute inset-0 animate-ping rounded-full bg-brand/30" />
                    )}
                  </div>
                  <div className="pt-1.5">
                    <p
                      className={`font-medium transition-colors duration-500 ${
                        current || done ? 'text-mist-50' : 'text-mist-400'
                      }`}
                    >
                      {stage.label}
                      {current && (
                        <span className="ml-2 inline-flex gap-0.5 align-middle">
                          {[0, 1, 2].map((d) => (
                            <motion.span
                              key={d}
                              animate={{ opacity: [0.2, 1, 0.2] }}
                              transition={{ repeat: Infinity, duration: 1.2, delay: d * 0.2 }}
                              className="h-1 w-1 rounded-full bg-brand-light"
                            />
                          ))}
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 text-sm text-mist-300">{stage.detail}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
