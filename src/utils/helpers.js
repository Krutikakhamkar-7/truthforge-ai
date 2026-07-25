export function formatDate(dateStr) {
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return dateStr
  }
}

// Consistent red -> amber -> emerald "truth spectrum" used across every
// confidence / trust visualization in the dashboard.
export function truthColor(score) {
  if (score >= 75) return '#2FD97F'
  if (score >= 45) return '#F5A623'
  return '#F2495C'
}

export function truthColorClass(score) {
  if (score >= 75) return 'text-truth-high border-truth-high/30 bg-truth-high/10'
  if (score >= 45) return 'text-truth-mid border-truth-mid/30 bg-truth-mid/10'
  return 'text-truth-low border-truth-low/30 bg-truth-low/10'
}

export function statusColorClass(status) {
  switch (status) {
    case 'Verified':
      return 'text-truth-high border-truth-high/30 bg-truth-high/10'
    case 'Contradicted':
      return 'text-truth-low border-truth-low/30 bg-truth-low/10'
    case 'Unverified':
    default:
      return 'text-truth-mid border-truth-mid/30 bg-truth-mid/10'
  }
}

export function sourceTypeIconKey(type) {
  const map = {
    Government: 'government',
    'Research Paper': 'research',
    Wikipedia: 'wikipedia',
    News: 'news',
    Blog: 'blog',
  }
  return map[type] || 'link'
}

export function copyToClipboard(text) {
  if (navigator?.clipboard?.writeText) {
    return navigator.clipboard.writeText(text)
  }
  const el = document.createElement('textarea')
  el.value = text
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  return Promise.resolve()
}

export function buildShareableReport(data) {
  if (!data) return ''
  const lines = [
    `VERITAS RESEARCH REPORT`,
    `Question: ${data.question}`,
    `Verdict: ${data.verdict} (${data.confidence}% confidence)`,
    ``,
    `Summary:`,
    data.summary,
    ``,
    `Claims:`,
    ...data.claims.map((c, i) => `${i + 1}. [${c.status}] ${c.text} (${c.confidence}% confidence)`),
  ]
  return lines.join('\n')
}
