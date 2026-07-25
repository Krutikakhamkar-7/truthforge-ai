import { AnimatePresence, motion } from 'framer-motion'
import { FiX, FiSearch, FiShield, FiEye, FiFileText } from 'react-icons/fi'

const AGENTS = [
  { icon: FiSearch, name: 'Research Agent', desc: 'Scours the web and indexed corpora for candidate evidence.' },
  { icon: FiShield, name: 'Verification Agent', desc: 'Cross-checks each claim against trusted, high-authority sources.' },
  { icon: FiEye, name: 'Hallucination Detection Agent', desc: 'Flags fabricated or unsupported statements before they reach you.' },
  { icon: FiFileText, name: 'Report Generator', desc: 'Synthesizes findings into this verified, explorable dashboard.' },
]

export default function AboutModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel w-full max-w-lg rounded-2xl p-7"
          >
            <div className="mb-5 flex items-start justify-between">
              <div>
                <p className="section-eyebrow mb-1">About the system</p>
                <h3 className="font-display text-2xl font-semibold text-mist-50">
                  Four agents. One verified answer.
                </h3>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-mist-300 transition-colors hover:bg-white/[0.08] hover:text-mist-50"
                aria-label="Close"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-mist-300">
              Veritas orchestrates four autonomous agents that research, verify, and audit any claim
              before presenting it to you &mdash; so you see not just an answer, but the evidence and
              confidence behind it.
            </p>
            <div className="space-y-3">
              {AGENTS.map((agent, i) => (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand-light">
                    <agent.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-mist-50">{agent.name}</p>
                    <p className="text-xs text-mist-300">{agent.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
