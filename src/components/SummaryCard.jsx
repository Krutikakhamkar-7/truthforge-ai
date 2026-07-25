import { FiFileText } from 'react-icons/fi'
import GlassCard from './ui/GlassCard'

export default function SummaryCard({ summary, question }) {
  return (
    <GlassCard className="p-8">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/15 text-brand-light">
          <FiFileText className="h-4 w-4" />
        </div>
        <p className="section-eyebrow">Research summary</p>
      </div>
      {question && (
        <p className="mb-3 font-display text-lg font-medium text-mist-50">&ldquo;{question}&rdquo;</p>
      )}
      <p className="text-[15px] leading-relaxed text-mist-200">{summary}</p>
    </GlassCard>
  )
}
