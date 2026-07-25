import { motion } from 'framer-motion'
import { truthColor } from '../../utils/helpers'

export default function CircularProgress({
  value = 0,
  size = 160,
  strokeWidth = 12,
  label,
  sublabel,
  showValue = true,
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference
  const color = truthColor(value)

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ filter: `drop-shadow(0 0 8px ${color}66)` }}
          />
        </svg>
        {showValue && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-3xl font-semibold" style={{ color }}>
              {value}%
            </span>
          </div>
        )}
      </div>
      {label && (
        <div className="text-center">
          <p className="font-medium text-mist-50">{label}</p>
          {sublabel && <p className="text-xs text-mist-300">{sublabel}</p>}
        </div>
      )}
    </div>
  )
}
