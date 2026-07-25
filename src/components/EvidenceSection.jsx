import { motion } from 'framer-motion'
import { FiExternalLink, FiCalendar, FiShield } from 'react-icons/fi'
import { formatDate, truthColor } from '../utils/helpers'

export default function EvidenceSection({ evidence = [] }) {
  if (!evidence.length) {
    return <p className="text-sm text-mist-400">No supporting evidence was located for this claim.</p>
  }

  return (
    <div className="space-y-3">
      <p className="section-eyebrow mb-1">Supporting evidence ({evidence.length})</p>
      {evidence.map((ev, i) => {
        const color = truthColor(ev.trustScore)
        return (
          <motion.a
            key={ev.id}
            href={ev.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="group flex flex-col gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.04] sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-semibold text-mist-50 group-hover:text-brand-light">
                  {ev.source}
                </p>
                <FiExternalLink className="h-3 w-3 shrink-0 text-mist-400" />
              </div>
              <p className="mt-1 line-clamp-2 text-xs text-mist-300">{ev.snippet}</p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-mist-400">
                <span className="inline-flex items-center gap-1 font-mono">
                  <FiCalendar className="h-3 w-3" /> {formatDate(ev.date)}
                </span>
                <span className="rounded border border-white/10 px-1.5 py-0.5 font-mono uppercase tracking-wide">
                  {ev.type}
                </span>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2 self-start sm:self-center">
              <FiShield className="h-3.5 w-3.5" style={{ color }} />
              <span className="font-mono text-sm font-semibold" style={{ color }}>
                {ev.trustScore}
              </span>
              <span className="text-[10px] text-mist-400">trust</span>
            </div>
          </motion.a>
        )
      })}
    </div>
  )
}
