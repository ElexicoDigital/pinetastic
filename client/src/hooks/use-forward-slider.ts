import { useEffect, useRef, useState } from 'react'

export function useForwardSlider(count: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [entered, setEntered] = useState(false)
  const [paused, setPaused] = useState(false)
  const [animate, setAnimate] = useState(true)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry) setEntered(entry.isIntersecting)
    }, { threshold: 0.35 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    if (!entered || paused || !animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setTimeout(() => setIndex(i => i + 1), index === 0 ? 2700 : 4000)
    return () => window.clearTimeout(timer)
  }, [entered, paused, animate, index])
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
  return { ref, index, animate, onEnd, next, prev, setPaused }
}