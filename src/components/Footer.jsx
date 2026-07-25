import { FiGithub, FiTwitter, FiHeart } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-brand to-truth-high">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white" fill="none">
              <path d="M6 12.5l4 4 8-9" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-sm font-medium text-mist-300">
            Veritas &copy; {new Date().getFullYear()} &mdash; Built for the Autonomous Multi-Agent Research &amp; Fact Verification hackathon
          </span>
        </div>
        <div className="flex items-center gap-4 text-mist-400">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-mist-50" aria-label="GitHub">
            <FiGithub className="h-4 w-4" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-mist-50" aria-label="Twitter">
            <FiTwitter className="h-4 w-4" />
          </a>
          <span className="flex items-center gap-1 text-xs">
            Made with <FiHeart className="h-3 w-3 text-truth-low" /> by Team
          </span>
        </div>
      </div>
    </footer>
  )
}
