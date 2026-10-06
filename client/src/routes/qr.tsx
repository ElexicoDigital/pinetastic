import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowUpRight, BookOpen, Globe } from 'lucide-react'
import { Brand } from '@/components/brand'
import { metadata } from '@/lib/metadata'
import mark from '@/assets/Generated/pinetastic-mark.png'

export const Route = createFileRoute('/qr')({
  head: () => metadata('Welcome to Pinetastic', 'Explore the Pinetastic website or open the catalogue of eco-friendly pine-needle products.'),
  component: QRPage,
})

function QRPage() {
  return (
    <main className="qr-page">
      <div className="qr-top"><div className="wrap"><Brand /></div></div>
      <div className="qr-main"><div className="wrap hero-in">
        <img className="hero-mark" src={mark} alt="" width={600} height={452} />
        <h1>Welcome to Pinetastic</h1>
        <p>Sustainable products, crafted from Himalayan pine needles.</p>
        <div className="qr-options">
          <Link to="/" className="qr-option"><Globe /><strong>Explore the website <ArrowUpRight size={18} /></strong><span>Our story, collections and founders.</span></Link>
          <Link to="/catalog" className="qr-option"><BookOpen /><strong>View the catalogue <ArrowUpRight size={18} /></strong><span>Products, specifications and pricing.</span></Link>
        </div>
      </div></div>
      <div className="qr-foot"><div className="wrap">www.pinetastic.in</div></div>
    </main>
  )
}
