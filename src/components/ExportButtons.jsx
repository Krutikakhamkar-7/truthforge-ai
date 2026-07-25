import { useState } from 'react'
import { motion } from 'framer-motion'
import { jsPDF } from 'jspdf'
import { FiDownload, FiCopy, FiShare2, FiCheck } from 'react-icons/fi'
import { buildShareableReport, copyToClipboard } from '../utils/helpers'

export default function ExportButtons({ data }) {
  const [copied, setCopied] = useState(false)
  const [shared, setShared] = useState(false)

  const handleCopy = async () => {
    await copyToClipboard(buildShareableReport(data))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' })
    const marginX = 48
    const pageWidth = doc.internal.pageSize.getWidth() - marginX * 2
    let y = 56

    const addWrapped = (text, size = 10, gap = 16, color = [30, 30, 35]) => {
      doc.setFontSize(size)
      doc.setTextColor(...color)
      const lines = doc.splitTextToSize(text, pageWidth)
      lines.forEach((line) => {
        if (y > 780) {
          doc.addPage()
          y = 56
        }
        doc.text(line, marginX, y)
        y += gap
      })
      y += 6
    }

    doc.setFontSize(20)
    doc.setTextColor(20, 20, 25)
    doc.text('Veritas Research Report', marginX, y)
    y += 30

    addWrapped(`Question: ${data.question}`, 12, 16)
    addWrapped(`Verdict: ${data.verdict}  |  Confidence: ${data.confidence}%`, 11, 16, [90, 60, 190])
    addWrapped('Summary', 13, 16)
    addWrapped(data.summary, 10, 14)
    addWrapped('Claims', 13, 16)
    data.claims.forEach((c, i) => {
      addWrapped(`${i + 1}. [${c.status}, ${c.confidence}%] ${c.text}`, 10, 14)
    })
    if (data.contradictions?.length) {
      addWrapped('Contradictions', 13, 16)
      data.contradictions.forEach((c) => {
        addWrapped(`- ${c.claimA}  vs.  ${c.claimB} (${c.severity} severity)`, 10, 14)
      })
    }

    doc.save(`veritas-report-${Date.now()}.pdf`)
  }

  const handleShare = async () => {
    const report = buildShareableReport(data)
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Veritas Report', text: report })
        setShared(true)
        setTimeout(() => setShared(false), 2000)
        return
      } catch {
        // user cancelled — fall through to clipboard
      }
    }
    await copyToClipboard(report)
    setShared(true)
    setTimeout(() => setShared(false), 2000)
  }

  const buttons = [
    { label: 'Download PDF', icon: FiDownload, onClick: handleDownload },
    { label: copied ? 'Copied!' : 'Copy Report', icon: copied ? FiCheck : FiCopy, onClick: handleCopy },
    { label: shared ? 'Shared!' : 'Share', icon: shared ? FiCheck : FiShare2, onClick: handleShare },
  ]

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {buttons.map((btn) => (
        <motion.button
          key={btn.label}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={btn.onClick}
          className="btn-secondary"
        >
          <btn.icon className="h-4 w-4" />
          {btn.label}
        </motion.button>
      ))}
    </div>
  )
}
