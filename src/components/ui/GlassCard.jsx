import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', delay = 0, hover = true, as = 'div', ...rest }) {
  const Comp = motion[as] || motion.div
  return (
    <Comp
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`card-surface p-6 ${hover ? '' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Comp>
  )
}
