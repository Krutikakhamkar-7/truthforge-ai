import { motion } from 'framer-motion'
import { FiAlertTriangle, FiZapOff } from 'react-icons/fi'
import GlassCard from './ui/GlassCard'

const SEVERITY_STYLE = {
  High: 'text-truth-low border-truth-low/40 bg-truth-low/10',
  Medium: 'text-truth-mid border-truth-mid/40 bg-truth-mid/10',
  Low: 'text-mist-300 border-white/20 bg-white/[0.04]',
}

export default function ContradictionSection({ contradictions = [] }) {
  if (!contradictions.length) {
    return (
      <GlassCard>
        <div className="flex items-center gap-3 text-mist-300">
          <FiZapOff className="h-5 w-5 text-truth-high" />
          <p className="text-sm">No contradictions detected across the extracted claims.</p>
        </div>
      </GlassCard>
    )
  }

  return (
    <div>
      <div className="mb-5 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-truth-low/15 text-truth-low">
          <FiAlertTriangle className="h-4 w-4" />
        </div>
        <div>
          <p className="section-eyebrow">Contradiction detection</p>
          <p className="text-xs text-mist-400">{contradictions.length} conflicting claim pair(s) found</p>
        </div>
      </div>

      <div className="space-y-4">
        {contradictions.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="rounded-2xl border border-truth-low/25 bg-truth-low/[0.04] p-5 sm:p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className={`chip border ${SEVERITY_STYLE[c.severity]}`}>{c.severity} severity</span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-truth-low/20 bg-ink-900/40 p-4">
                <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-truth-low">Claim A</p>
                <p className="text-sm leading-relaxed text-mist-100">{c.claimA}</p>
              </div>
              <div className="rounded-xl border border-truth-low/20 bg-ink-900/40 p-4">
                <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-truth-low">Claim B</p>
                <p className="text-sm leading-relaxed text-mist-100">{c.claimB}</p>
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-mist-300">
              <span className="font-semibold text-mist-100">Why this matters: </span>
              {c.explanation}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
