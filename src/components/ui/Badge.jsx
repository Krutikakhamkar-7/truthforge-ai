import { FiCheckCircle, FiXCircle, FiHelpCircle } from 'react-icons/fi'
import { statusColorClass } from '../../utils/helpers'

const ICONS = {
  Verified: FiCheckCircle,
  Contradicted: FiXCircle,
  Unverified: FiHelpCircle,
}

export default function Badge({ status, className = '' }) {
  const Icon = ICONS[status] || FiHelpCircle
  return (
    <span className={`chip border ${statusColorClass(status)} ${className}`}>
      <Icon className="h-3.5 w-3.5" />
      {status}
    </span>
  )
}
