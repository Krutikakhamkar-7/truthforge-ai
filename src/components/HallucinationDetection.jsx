import { motion } from 'framer-motion'
import { FiEye, FiAlertOctagon, FiCheckCircle } from 'react-icons/fi'
import GlassCard from './ui/GlassCard'
import { truthColor } from '../utils/helpers'

export default function HallucinationDetection({ hallucinations = [] }) {
  const detectedCount = hallucinations.filter((h) => h.detected).length

  return (
    <div>
      <div className="mb-5 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/15 text-brand-light">
          <FiEye className="h-4 w-4" />
        </div>
        <div>
          <p className="section-eyebrow">Hallucination detection</p>
          <p className="text-xs text-mist-400">
            {detectedCount > 0 ? `${detectedCount} potential fabrication(s) flagged` : 'No fabrications detected'}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {hallucinations.map((h, i) => {
          const color = truthColor(100 - h.riskScore)
          return (
            <GlassCard key={h.id} delay={i * 0.06} className="p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    {h.detected ? (
                      <span className="chip border border-truth-low/30 bg-truth-low/10 text-truth-low">
                        <FiAlertOctagon className="h-3.5 w-3.5" /> Detected
                      </span>
                    ) : (
                      <span className="chip border border-truth-high/30 bg-truth-high/10 text-truth-high">
                        <FiCheckCircle className="h-3.5 w-3.5" /> Not Detected
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-mist-50">{h.claim}</p>
                  <p className="mt-1.5 text-xs text-mist-300">{h.reason}</p>
                </div>

                <div className="flex shrink-0 flex-col items-center gap-1.5 sm:w-32">
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/[0.08]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${h.riskScore}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: truthColor(100 - h.riskScore) }}
                    />
                  </div>
                  <p className="font-mono text-xs text-mist-300">
                    Risk: <span style={{ color }}>{h.riskScore}%</span>
                  </p>
                </div>
              </div>
            </GlassCard>
          )
        })}
      </div>
    </div>
  )
}
