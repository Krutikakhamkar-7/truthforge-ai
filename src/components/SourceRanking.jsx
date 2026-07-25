import { motion } from 'framer-motion'
import { FiGlobe, FiBookOpen, FiFileText, FiRss, FiMessageSquare } from 'react-icons/fi'
import GlassCard from './ui/GlassCard'
import { truthColor } from '../utils/helpers'

const ICONS = {
  Government: FiGlobe,
  'Research Paper': FiBookOpen,
  Wikipedia: FiFileText,
  News: FiRss,
  Blog: FiMessageSquare,
}

export default function SourceRanking({ sources = [] }) {
  const sorted = [...sources].sort((a, b) => b.trust - a.trust)

  return (
    <GlassCard>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="section-eyebrow">Source ranking</p>
          <p className="text-xs text-mist-400">Ranked by trust score across {sources.reduce((a, s) => a + s.count, 0)} references</p>
        </div>
      </div>

      <div className="space-y-4">
        {sorted.map((s, i) => {
          const Icon = ICONS[s.type] || FiFileText
          const color = truthColor(s.trust)
          return (
            <div key={s.type} className="flex items-center gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-mist-200">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1.5 flex items-center justify-between">
                  <p className="text-sm font-medium text-mist-50">{s.type}</p>
                  <span className="font-mono text-sm font-semibold" style={{ color }}>
                    {s.trust}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.trust}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </div>
              </div>
              <span className="w-14 shrink-0 text-right font-mono text-xs text-mist-400">{s.count} refs</span>
            </div>
          )
        })}
      </div>
    </GlassCard>
  )
}
