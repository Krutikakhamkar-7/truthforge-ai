import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from 'recharts'
import { FiBarChart2 } from 'react-icons/fi'
import GlassCard from './ui/GlassCard'
import CircularProgress from './ui/CircularProgress'
import { truthColor } from '../utils/helpers'

const PIE_COLORS = { Verified: '#2FD97F', Contradicted: '#F2495C', Unverified: '#F5A623' }

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-white/10 bg-ink-800/95 px-3 py-2 text-xs shadow-glass backdrop-blur-xl">
      {label && <p className="mb-1 font-mono text-mist-300">{label}</p>}
      {payload.map((p) => (
        <p key={p.dataKey} className="font-mono font-semibold text-mist-50">
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  )
}

export default function ConfidenceDashboard({ confidence, charts }) {
  const distribution = charts?.confidenceDistribution || []
  const sourceTrust = charts?.sourceTrust || []
  const overTime = charts?.confidenceOverTime || []

  return (
    <div>
      <div className="mb-5 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/15 text-brand-light">
          <FiBarChart2 className="h-4 w-4" />
        </div>
        <div>
          <p className="section-eyebrow">Confidence dashboard</p>
          <p className="text-xs text-mist-400">Aggregate scoring across every extracted claim</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <GlassCard className="flex flex-col items-center justify-center p-8">
          <CircularProgress value={confidence} size={172} strokeWidth={13} label="Overall Confidence" sublabel="Weighted across all claims" />
        </GlassCard>

        <GlassCard delay={0.05}>
          <p className="mb-4 text-sm font-medium text-mist-100">Claim Status Breakdown</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distribution}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={52}
                  outerRadius={80}
                  paddingAngle={4}
                  strokeWidth={0}
                >
                  {distribution.map((entry) => (
                    <Cell key={entry.name} fill={PIE_COLORS[entry.name] || '#5B6178'} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            {distribution.map((d) => (
              <span key={d.name} className="inline-flex items-center gap-1.5 text-xs text-mist-300">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: PIE_COLORS[d.name] }} />
                {d.name} ({d.value})
              </span>
            ))}
          </div>
        </GlassCard>

        <GlassCard delay={0.1}>
          <p className="mb-4 text-sm font-medium text-mist-100">Source Trust by Type</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceTrust} layout="vertical" margin={{ left: 0, right: 12, top: 4, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fill: '#8B92A5', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#8B92A5', fontSize: 11 }} axisLine={false} tickLine={false} width={78} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                <Bar dataKey="trust" radius={[0, 6, 6, 0]}>
                  {sourceTrust.map((entry) => (
                    <Cell key={entry.name} fill={truthColor(entry.trust)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <GlassCard delay={0.15} className="mt-4">
        <p className="mb-4 text-sm font-medium text-mist-100">Confidence Progression Through Pipeline</p>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={overTime} margin={{ left: -20, right: 12, top: 8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="stage" tick={{ fill: '#8B92A5', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: '#8B92A5', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Line
                type="monotone"
                dataKey="confidence"
                stroke="#8B75E8"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#8B75E8', strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  )
}
