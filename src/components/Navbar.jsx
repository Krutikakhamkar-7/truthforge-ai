import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSun, FiMoon, FiInfo, FiGithub } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'
import AboutModal from './AboutModal'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [aboutOpen, setAboutOpen] = useState(false)

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-50 border-b border-white/[0.06] bg-ink-950/70 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-truth-high shadow-glow">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none">
                <path d="M6 12.5l4 4 8-9" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="absolute inset-0 animate-pulse-slow rounded-lg ring-1 ring-white/20" />
            </div>
            <div className="leading-tight">
              <p className="font-display text-lg font-semibold tracking-tight text-mist-50">Veritas</p>
              <p className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-mist-300 sm:block">
                Multi-Agent Fact Verification
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm text-mist-300 transition-colors hover:text-mist-50 sm:flex"
            >
              <FiGithub className="h-4 w-4" />
              Source
            </a>
            <button
              onClick={() => setAboutOpen(true)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-mist-300 transition-colors hover:bg-white/[0.06] hover:text-mist-50"
            >
              <FiInfo className="h-4 w-4" />
              <span className="hidden sm:inline">About</span>
            </button>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-mist-200 transition-colors hover:bg-white/[0.08]"
            >
              {theme === 'dark' ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
            </button>
          </nav>
        </div>
      </motion.header>
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  )
}
