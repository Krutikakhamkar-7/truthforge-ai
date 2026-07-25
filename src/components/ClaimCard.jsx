import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'
import Badge from './ui/Badge'
import EvidenceSection from './EvidenceSection'
import { truthColor } from '../utils/helpers'

export default function ClaimCard({ claim, index }) {
  const [expanded, setExpanded] = useState(false)
  const color = truthColor(claim.confidence)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="card-surface overflow-hidden rounded-2xl"
    >
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
      >
        <div className="flex-1">
          <div className="mb-2.5 flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-mist-400">Claim {String(index + 1).padStart(2, '0')}</span>
            <Badge status={claim.status} />
          </div>
          <p className="text-[15px] font-medium leading-relaxed text-mist-50">{claim.text}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${claim.confidence}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
              />
            </div>
            <span className="font-mono text-sm font-semibold" style={{ color }}>
              {claim.confidence}%
            </span>
          </div>
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <FiChevronDown className="h-4 w-4 text-mist-300" />
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/[0.06]"
          >
            <div className="p-5 sm:p-6">
              <EvidenceSection evidence={claim.evidence} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
