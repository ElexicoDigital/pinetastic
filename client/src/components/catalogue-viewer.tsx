import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, ChevronUp, Maximize2, PanelLeft, X, ZoomIn, ZoomOut } from 'lucide-react'
import type { PDFDocumentProxy } from 'pdfjs-dist'
import mark from '@/assets/Generated/pinetastic-mark.png'
import catalogue from '@/assets/Catalogue/Pinetastic.pdf?url'

const ZOOMS = [0.5, 0.75, 1, 1.25, 1.5, 2, 2.5]
const DEFAULT_RATIO = 1.414

/** Draw one PDF page into a canvas, sharp but with a safe memory cap. */
async function paintPage(pdf: PDFDocumentProxy, pageNumber: number, canvas: HTMLCanvasElement, cssWidth: number, signal: { cancelled: boolean }) {
  const page = await pdf.getPage(pageNumber)
  if (signal.cancelled) return
  const base = page.getViewport({ scale: 1 })
  const density = Math.min(window.devicePixelRatio || 1, 2, 2600 / cssWidth)
  const viewport = page.getViewport({ scale: (cssWidth / base.width) * density })
  // Render off-screen first, then swap in, so zooming never flashes blank.
  const buffer = document.createElement('canvas')
  buffer.width = Math.floor(viewport.width)
  buffer.height = Math.floor(viewport.height)
  const context = buffer.getContext('2d')
  if (!context) return
  const task = page.render({ canvasContext: context, viewport })
  const stop = window.setInterval(() => { if (signal.cancelled) task.cancel() }, 60)
  try { await task.promise } catch { return } finally { window.clearInterval(stop) }
  if (signal.cancelled) return
  canvas.width = buffer.width
  canvas.height = buffer.height
  canvas.getContext('2d')?.drawImage(buffer, 0, 0)
}

function useNear<T extends Element>(margin: string) {
  const ref = useRef<T>(null)
  const [near, setNear] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => { if (entry) setNear(entry.isIntersecting) }, { rootMargin: margin })
    io.observe(el)
    return () => io.disconnect()
  }, [margin])
  return [ref, near] as const
}

type PageProps = { pdf: PDFDocumentProxy; pageNumber: number; width: number; ratio: number; onActive: (n: number) => void }

function PdfPage({ pdf, pageNumber, width, ratio, onActive }: PageProps) {
  const [wrapRef, near] = useNear<HTMLDivElement>('900px 0px 900px 0px')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!near || !canvasRef.current) return
    const signal = { cancelled: false }
    const canvas = canvasRef.current
    const timer = window.setTimeout(() => {
      void paintPage(pdf, pageNumber, canvas, width, signal).then(() => { if (!signal.cancelled) setReady(true) })
    }, 120)
    return () => { signal.cancelled = true; window.clearTimeout(timer) }
  }, [near, pdf, pageNumber, width])

  // Which page is in the middle of the screen right now?
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => { if (entry?.isIntersecting) onActive(pageNumber) }, { rootMargin: '-45% 0px -50% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [pageNumber, onActive, wrapRef])

  return (
    <div ref={wrapRef} id={`pdf-page-${pageNumber}`} className={`pv-page ${ready ? 'is-ready' : ''}`} style={{ width, aspectRatio: `1 / ${ratio}` }}>
      <div className="pv-skeleton" aria-hidden="true"><img src={mark} alt="" width={600} height={452} /></div>
      <canvas ref={canvasRef} aria-label={`Catalogue page ${pageNumber}`} />
    </div>
  )
}

function Thumb({ pdf, pageNumber, ratio, active, onSelect }: { pdf: PDFDocumentProxy; pageNumber: number; ratio: number; active: boolean; onSelect: (n: number) => void }) {
  const [ref, near] = useNear<HTMLButtonElement>('400px 0px 400px 0px')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (!near || ready || !canvasRef.current) return
    const signal = { cancelled: false }
    void paintPage(pdf, pageNumber, canvasRef.current, 120, signal).then(() => { if (!signal.cancelled) setReady(true) })
    return () => { signal.cancelled = true }
  }, [near, ready, pdf, pageNumber])
  return (
    <button ref={ref} type="button" className={`pv-thumb ${active ? 'is-active' : ''} ${ready ? 'is-ready' : ''}`} data-active={active} aria-label={`Go to page ${pageNumber}`} aria-current={active ? 'page' : undefined} onClick={() => onSelect(pageNumber)}>
      <span className="pv-thumb-frame" style={{ aspectRatio: `1 / ${ratio}` }}><canvas ref={canvasRef} /></span>
      <span className="pv-thumb-num">{pageNumber}</span>
    </button>
  )
}

export function CatalogueViewer() {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null)
  const [ratios, setRatios] = useState<number[]>([])
  const [progress, setProgress] = useState<number | null>(null)
  const [error, setError] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [zoom, setZoom] = useState(1)
  const [panelOpen, setPanelOpen] = useState(false)
  const [area, setArea] = useState(900)
  const areaRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLElement>(null)
  const pageRef = useRef(1)
  pageRef.current = pageNumber

  // Page previews open by default on large screens.
  useEffect(() => { if (window.matchMedia('(min-width: 901px)').matches) setPanelOpen(true) }, [])

  // Load the PDF once.
  useEffect(() => {
    let cancelled = false
    let destroy: (() => void) | undefined
    async function load() {
      try {
        const pdfjs = await import('pdfjs-dist')
        const worker = await import('pdfjs-dist/build/pdf.worker.min.mjs?url')
        pdfjs.GlobalWorkerOptions.workerSrc = worker.default
        const task = pdfjs.getDocument({ url: catalogue })
        destroy = () => { void task.destroy() }
        task.onProgress = ({ loaded, total }: { loaded: number; total: number }) => { if (!cancelled && total) setProgress(Math.min(100, Math.round((loaded / total) * 100))) }
        const doc = await task.promise
        const sizes = await Promise.all(Array.from({ length: doc.numPages }, async (_, i) => {
          const v = (await doc.getPage(i + 1)).getViewport({ scale: 1 })
          return v.height / v.width
        }))
        if (cancelled) return
        setRatios(sizes)
        setPdf(doc)
      } catch (e) {
        console.error('Catalogue rendering failed', e)
        if (!cancelled) setError(true)
      }
    }
    void load()
    return () => { cancelled = true; destroy?.() }
  }, [])

  // Available width for pages.
  useEffect(() => {
    const el = areaRef.current
    if (!el) return
    const update = () => setArea(el.clientWidth)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const fitWidth = Math.max(240, Math.min(area - (area < 640 ? 24 : 48), 960))
  const width = Math.round(fitWidth * zoom)
  const count = ratios.length || 16

  const goTo = useCallback((n: number, behavior: ScrollBehavior = 'smooth') => {
    const target = Math.min(Math.max(n, 1), count)
    document.getElementById(`pdf-page-${target}`)?.scrollIntoView({ behavior, block: 'start' })
    setPageNumber(target)
  }, [count])

  const changeZoom = (dir: 1 | -1 | 0) => {
    setZoom(z => {
      if (dir === 0) return 1
      const i = ZOOMS.findIndex(v => v >= z - 0.001)
      const next = Math.min(Math.max((i < 0 ? 2 : i) + dir, 0), ZOOMS.length - 1)
      return ZOOMS[next] ?? 1
    })
    window.requestAnimationFrame(() => document.getElementById(`pdf-page-${pageRef.current}`)?.scrollIntoView({ block: 'start' }))
  }

  // Keep the active thumbnail visible inside the left panel.
  useEffect(() => {
    const panel = panelRef.current
    const active = panel?.querySelector<HTMLElement>('[data-active="true"]')
    if (!panel || !active) return
    panel.scrollTo({ top: active.offsetTop - panel.clientHeight / 2 + active.clientHeight / 2, behavior: 'smooth' })
  }, [pageNumber, pdf])

  const selectFromPanel = (n: number) => {
    goTo(n)
    if (window.matchMedia('(max-width: 900px)').matches) setPanelOpen(false)
  }

  const zoomLabel = useMemo(() => `${Math.round(zoom * 100)}%`, [zoom])
  const pages = Array.from({ length: count }, (_, i) => i + 1)

  return (
    <div className="pv">
      <div className="pv-toolbar" role="toolbar" aria-label="Catalogue controls">
        <button type="button" className={`pv-btn pv-panel-toggle ${panelOpen ? 'is-on' : ''}`} aria-label="Toggle page previews" aria-pressed={panelOpen} onClick={() => setPanelOpen(o => !o)}><PanelLeft /></button>
        <div className="pv-group">
          <button type="button" className="pv-btn" aria-label="Previous page" disabled={pageNumber <= 1} onClick={() => goTo(pageNumber - 1)}><ChevronUp /></button>
          <span className="pv-count"><em>Page </em><b>{pageNumber}</b> / {count}</span>
          <button type="button" className="pv-btn" aria-label="Next page" disabled={pageNumber >= count} onClick={() => goTo(pageNumber + 1)}><ChevronDown /></button>
        </div>
        <div className="pv-group">
          <button type="button" className="pv-btn" aria-label="Zoom out" disabled={zoom <= ZOOMS[0]!} onClick={() => changeZoom(-1)}><ZoomOut /></button>
          <span className="pv-zoom" aria-live="polite">{zoomLabel}</span>
          <button type="button" className="pv-btn" aria-label="Zoom in" disabled={zoom >= ZOOMS[ZOOMS.length - 1]!} onClick={() => changeZoom(1)}><ZoomIn /></button>
          <button type="button" className="pv-btn" aria-label="Fit to width" onClick={() => changeZoom(0)}><Maximize2 /></button>
        </div>
      </div>

      <div className="pv-body">
        <div className={`pv-backdrop ${panelOpen ? 'is-open' : ''}`} onClick={() => setPanelOpen(false)} aria-hidden="true" />
        <aside ref={panelRef} className={`pv-panel ${panelOpen ? 'is-open' : ''}`} aria-label="Page previews" aria-hidden={!panelOpen}>
          <div className="pv-panel-head"><span>Pages</span><button type="button" className="pv-btn pv-panel-close" aria-label="Close page previews" onClick={() => setPanelOpen(false)}><X /></button></div>
          {pdf && pages.map(n => <Thumb key={n} pdf={pdf} pageNumber={n} ratio={ratios[n - 1] ?? DEFAULT_RATIO} active={n === pageNumber} onSelect={selectFromPanel} />)}
        </aside>

        <div ref={areaRef} className="pv-area">
          {error && <p className="pv-error" role="alert">The catalogue could not be shown here. Please use <b>Open PDF</b> to view the original.</p>}
          {!pdf && !error && (
            <div className="pv-loading" role="status" aria-live="polite">
              <div className="pv-sheet" style={{ width: fitWidth, aspectRatio: `1 / ${DEFAULT_RATIO}` }}>
                <div className="pv-loader">
                  <span className="pv-ring"><img src={mark} alt="" width={600} height={452} /></span>
                  <strong>Preparing the catalogue</strong>
                  <span className="pv-bar"><i className={progress === null ? 'is-indeterminate' : ''} style={progress === null ? undefined : { width: `${progress}%` }} /></span>
                  <small>{progress === null ? 'Opening Pinetastic…' : `${progress}%`}</small>
                </div>
              </div>
            </div>
          )}
          {pdf && (
            <div className="pv-scroll">
              <div className="pv-pages">
                {pages.map(n => <PdfPage key={n} pdf={pdf} pageNumber={n} width={width} ratio={ratios[n - 1] ?? DEFAULT_RATIO} onActive={setPageNumber} />)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}