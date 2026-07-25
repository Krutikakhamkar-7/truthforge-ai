import { FiList } from 'react-icons/fi'
import ClaimCard from './ClaimCard'

export default function ClaimsSection({ claims = [] }) {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/15 text-brand-light">
            <FiList className="h-4 w-4" />
          </div>
          <div>
            <p className="section-eyebrow">Extracted claims</p>
            <p className="text-xs text-mist-400">{claims.length} claims identified &middot; tap to expand evidence</p>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {claims.map((claim, i) => (
          <ClaimCard key={claim.id} claim={claim} index={i} />
        ))}
      </div>
    </div>
  )
}
