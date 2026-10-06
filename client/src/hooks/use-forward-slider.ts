import { useEffect, useRef, useState } from 'react'

type Options = {
  /** Delay (ms) before the very first slide after the slider appears. */
  firstDelay?: number
  /** Time (ms) between the following slides. */
  interval?: number
  /** 'rtl' = original forward movement (next slide), 'ltr' = reverse. */
  direction?: 'ltr' | 'rtl'
}

/**
 * Auto slider: while it is on screen it keeps moving, one slide every
 * `interval` ms, and loops back to the first slide after the last one.
 */
export function useForwardSlider(count: number, { firstDelay = 1000, interval = 2500, direction = 'rtl' }: Options = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [entered, setEntered] = useState(false)
  const [paused, setPaused] = useState(false)
  const [animate, setAnimate] = useState(true)

  // Is the slider on screen?
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry) setEntered(entry.isIntersecting)
    }, { threshold: 0.1 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const pendingPrev = useRef(false)
  useEffect(() => {
    if (animate) {
      if (pendingPrev.current) { pendingPrev.current = false; setIndex(i => i - 1) }
      return
    }
    let second = 0
    const first = requestAnimationFrame(() => { second = requestAnimationFrame(() => setAnimate(true)) })
    return () => { cancelAnimationFrame(first); cancelAnimationFrame(second) }
  }, [animate])

  const onEnd = () => {
    if (index >= count) { setAnimate(false); setIndex(0) }
  }
  const next = () => { if (index < count) setIndex(i => i + 1) }
  const prev = () => {
    if (!animate) return
    if (index > 0) setIndex(i => i - 1)
    else { pendingPrev.current = true; setAnimate(false); setIndex(count) }
  }

  // Auto movement: a steady clock that keeps ticking while the slider is on screen.
  const step = () => {
    if (!animate) return
    if (direction === 'ltr') prev(); else next()
  }
  const stepRef = useRef(step)
  stepRef.current = step
  useEffect(() => {
    if (!entered || paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let timer = 0
    let first = true
    const schedule = () => {
      timer = window.setTimeout(() => {
        stepRef.current()
        first = false
        schedule()
      }, first ? firstDelay : interval)
    }
    schedule()
    return () => window.clearTimeout(timer)
  }, [entered, paused, firstDelay, interval])

  return { ref, index, animate, onEnd, next, prev, setPaused }
}