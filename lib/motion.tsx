import { useRef, useEffect, RefObject } from 'react'
import {
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
  useMotionValue,
  animate,
  type MotionValue,
} from 'framer-motion'

// ── Shared variants ──────────────────────────────────────────

export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } },
}

export const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

// ── useSoftParallax ──────────────────────────────────────────
// Returns a MotionValue<number> (pixels) that translates Y as
// the target element scrolls through the viewport.

export function useSoftParallax(
  ref: RefObject<HTMLElement | null>,
  intensity = 30
): MotionValue<number> {
  const shouldReduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  return useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduce ? [0, 0] : [-intensity, intensity]
  )
}

// ── Counter ──────────────────────────────────────────────────
// Animates a number from `from` → `to` when it scrolls into view.

interface CounterProps {
  from?: number
  to: number
  duration?: number
}

export function Counter({ from = 0, to, duration = 1.2 }: CounterProps) {
  const spanRef = useRef<HTMLSpanElement>(null)
  const motionVal = useMotionValue(from)
  const inView = useInView(spanRef, { once: true })
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (shouldReduce) {
      if (spanRef.current) spanRef.current.textContent = String(to)
      return
    }
    const controls = animate(motionVal, to, {
      duration,
      ease: 'easeOut',
      onUpdate(v) {
        if (spanRef.current) spanRef.current.textContent = Math.round(v).toString()
      },
    })
    return () => controls.stop()
  }, [inView, to, duration, motionVal, shouldReduce])

  return <span ref={spanRef}>{from}</span>
}
