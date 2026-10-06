import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import catalogue from '@/assets/Catalogue/Pinetastic.pdf?url'

export function CatalogueViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageCount, setPageCount] = useState(16)
  const [status, setStatus] = useState('Loading catalogue…')
  useEffect(() => {
    let cancelled = false
    let destroy: (() => void) | undefined
    async function render() {
      setStatus('Loading catalogue…')
      try {
        const pdfjs = await import('pdfjs-dist')
        const worker = await import('pdfjs-dist/build/pdf.worker.min.mjs?url')
        pdfjs.GlobalWorkerOptions.workerSrc = worker.default
        const task = pdfjs.getDocument({ url: catalogue })
        destroy = () => { void task.destroy() }
        const pdf = await task.promise
        if (cancelled) return
        setPageCount(pdf.numPages)
        const page = await pdf.getPage(pageNumber)
        const canvas = canvasRef.current
        if (!canvas || cancelled) return
        const context = canvas.getContext('2d')
        if (!context) return
        const viewport = page.getViewport({ scale: 1 })
        const width = Math.min(canvas.parentElement?.clientWidth || 900, 960)
        const scaled = page.getViewport({ scale: width / viewport.width * Math.min(window.devicePixelRatio, 2) })
        canvas.width = scaled.width
        canvas.height = scaled.height
        await page.render({ canvasContext: context, viewport: scaled }).promise
        if (!cancelled) setStatus('')
      } catch (error) {
        console.error('Catalogue rendering failed', error)
        if (!cancelled) setStatus('Please use Open PDF to view the original catalogue.')
      }
    }
    void render()
    return () => { cancelled = true; destroy?.() }
  }, [pageNumber])
  return <div className="pdf-viewer"><div className="pdf-pagination"><Button variant="ghost" size="icon" aria-label="Previous catalogue page" disabled={pageNumber === 1} onClick={() => setPageNumber(pageNumber - 1)}><ArrowLeft /></Button><span>Page {pageNumber} / {pageCount}</span><Button variant="ghost" size="icon" aria-label="Next catalogue page" disabled={pageNumber === pageCount} onClick={() => setPageNumber(pageNumber + 1)}><ArrowRight /></Button></div>{status && <p className="pdf-status" role="status">{status}</p>}<div className="pdf-paper"><canvas ref={canvasRef} aria-label={`Catalogue page ${pageNumber}`} /></div></div>
}