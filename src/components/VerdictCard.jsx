import { motion } from 'framer-motion'
import { FiAward, FiShieldOff, FiAlertCircle } from 'react-icons/fi'

const VERDICT_MAP = {
  'Highly Reliable': {
    icon: FiAward,
    color: '#2FD97F',
    desc: 'This answer is strongly corroborated by high-trust, independent sources.',
  },
  'Partially Reliable': {
    icon: FiAlertCircle,
    color: '#F5A623',
    desc: 'Core claims check out, but some details lack strong corroboration.',
  },
  'Needs Verification': {
    icon: FiShieldOff,
    color: '#F2495C',
    desc: 'Significant contradictions or unverified claims were found. Treat with caution.',
  },
}

export default function VerdictCard({ verdict, confidence }) {
  const meta = VERDICT_MAP[verdict] || VERDICT_MAP['Needs Verification']
  const Icon = meta.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-2xl border p-8 text-center sm:p-10"
      style={{
        borderColor: `${meta.color}40`,
        background: `linear-gradient(135deg, ${meta.color}14, transparent 60%)`,
      }}
    >
      <div
        className="absolute -top-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full blur-[80px]"
        style={{ backgroundColor: `${meta.color}33` }}
      />
      <div className="relative">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.15 }}
          className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${meta.color}1F`, boxShadow: `0 0 40px ${meta.color}40` }}
        >
          <Icon className="h-8 w-8" style={{ color: meta.color }} />
        </motion.div>
        <p className="section-eyebrow mb-2">Final verdict</p>
        <h3 className="font-display text-3xl font-semibold tracking-tight" style={{ color: meta.color }}>
          {verdict}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-mist-300">{meta.desc}</p>
        <div className="mx-auto mt-6 flex max-w-xs items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${confidence}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="h-full rounded-full"
              style={{ backgroundColor: meta.color }}
            />
          </div>
          <span className="font-mono text-sm font-semibold" style={{ color: meta.color }}>
            {confidence}%
          </span>
        </div>
      </div>
    </motion.div>
  )
}
