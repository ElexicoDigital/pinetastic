import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { Brand } from '@/components/brand'
import { metadata } from '@/lib/metadata'
import catalogue from '@/assets/Catalogue/Pinetastic.pdf?url'
import { CatalogueViewer } from '@/components/catalogue-viewer'

export const Route = createFileRoute('/catalog')({
  head: () => metadata('Pinetastic Catalogue — Pine-needle products', 'Browse the Pinetastic catalogue of corporate bags, conference stationery and pine biomass planters.'),
  component: CataloguePage,
})

function CataloguePage() {
  return <main><header className="catalog-header"><div className="wrap"><Brand /><div className="catalog-tools"><Link to="/" className="cat-btn cat-btn-outline" aria-label="Back to website"><ArrowLeft /><span>Website</span></Link><a href={catalogue} target="_blank" rel="noreferrer" className="cat-btn cat-btn-gold"><span>Open PDF</span><ExternalLink /></a></div></div></header><CatalogueViewer /></main>
}