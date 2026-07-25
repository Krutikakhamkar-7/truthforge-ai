import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import ProcessingTimeline from '../components/ProcessingTimeline'
import SummaryCard from '../components/SummaryCard'
import ClaimsSection from '../components/ClaimsSection'
import ConfidenceDashboard from '../components/ConfidenceDashboard'
import SourceRanking from '../components/SourceRanking'
import ContradictionSection from '../components/ContradictionSection'
import HallucinationDetection from '../components/HallucinationDetection'
import VerdictCard from '../components/VerdictCard'
import ExportButtons from '../components/ExportButtons'
import { useResearch, STATUS } from '../hooks/useResearch'

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

function Section({ children, className = '' }) {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`mx-auto max-w-6xl px-6 py-8 ${className}`}
    >
      {children}
    </motion.section>
  )
}

export default function Dashboard() {
  const { status, data, error, submitQuestion, reset } = useResearch()
  const loading = status === STATUS.LOADING

  return (
    <main>
      <Hero onSubmit={submitQuestion} loading={loading} />
      <ProcessingTimeline active={loading} />

      {status === STATUS.ERROR && (
        <Section>
          <div className="rounded-2xl border border-truth-low/30 bg-truth-low/[0.06] p-6 text-center">
            <p className="text-sm text-truth-low">{error}</p>
            <button onClick={reset} className="btn-secondary mt-4">
              Try again
            </button>
          </div>
        </Section>
      )}

      {status === STATUS.SUCCESS && data && (
        <div className="pb-24">
          <Section>
            <SummaryCard summary={data.summary} question={data.question} />
          </Section>

          <Section>
            <ClaimsSection claims={data.claims} />
          </Section>

          <Section>
            <ConfidenceDashboard confidence={data.confidence} charts={data.charts} />
          </Section>

          <Section>
            <SourceRanking sources={data.sources} />
          </Section>

          <Section>
            <ContradictionSection contradictions={data.contradictions} />
          </Section>

          <Section>
            <HallucinationDetection hallucinations={data.hallucinations} />
          </Section>

          <Section>
            <VerdictCard verdict={data.verdict} confidence={data.confidence} />
          </Section>

          <Section>
            <ExportButtons data={data} />
          </Section>
        </div>
      )}
    </main>
  )
}
