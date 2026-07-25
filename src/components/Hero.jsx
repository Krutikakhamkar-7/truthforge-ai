import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight, FiZap } from 'react-icons/fi'

const SUGGESTIONS = [
  'Did the WHO declare COVID-19 a pandemic on March 11, 2020?',
  'Is the Great Wall of China visible from space?',
  'Did Einstein fail math in school?',
]

export default function Hero({ onSubmit, loading }) {
  const [question, setQuestion] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(question)
  }

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-16 sm:pt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center">
        <div className="h-[420px] w-[720px] rounded-full bg-brand/20 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-mist-300"
        >
          <FiZap className="h-3.5 w-3.5 text-truth-mid" />
          4-agent autonomous verification pipeline
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-mist-50 sm:text-6xl"
        >
          Ask anything.
          <br />
          <span className="spectrum-text">Get a verified answer.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-mist-300 sm:text-lg"
        >
          Veritas dispatches research, verification, and hallucination-detection agents in parallel,
          then hands you a fully-sourced, confidence-scored report &mdash; every claim traceable to
          real evidence.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSubmit}
          className="mx-auto mt-10 max-w-2xl"
        >
          <div className="glass-panel flex items-center gap-2 rounded-2xl p-2 pl-5 focus-within:border-brand/50 focus-within:shadow-glow">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a factual question to verify…"
              className="h-12 flex-1 bg-transparent text-sm text-mist-50 placeholder:text-mist-400 focus:outline-none sm:text-base"
              disabled={loading}
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              disabled={loading || !question.trim()}
              className="btn-primary h-12 shrink-0 px-5"
            >
              {loading ? 'Verifying' : 'Verify'}
              <FiArrowRight className="h-4 w-4" />
            </motion.button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                type="button"
                key={s}
                disabled={loading}
                onClick={() => setQuestion(s)}
                className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3.5 py-1.5 text-xs text-mist-300 transition-colors hover:border-white/20 hover:text-mist-50 disabled:opacity-40"
              >
                {s.length > 46 ? s.slice(0, 46) + '…' : s}
              </button>
            ))}
          </div>
        </motion.form>
      </div>
    </section>
  )
}
