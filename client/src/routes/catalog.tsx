import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { Brand } from '@/components/brand'
import { Button } from '@/components/ui/button'
import { metadata } from '@/lib/metadata'
import catalogue from '@/assets/Catalogue/Pinetastic.pdf?url'
import { CatalogueViewer } from '@/components/catalogue-viewer'

export const Route = createFileRoute('/catalog')({
  head: () => metadata('Pinetastic Catalogue — Pine-needle products', 'Browse the Pinetastic catalogue of corporate bags, conference stationery and pine biomass planters.'),
  component: CataloguePage,
})

function CataloguePage() {
  return <main><header className="catalog-header"><div className="wrap"><Brand /><div className="catalog-tools"><Button variant="editorial" asChild><Link to="/"><ArrowLeft />Website</Link></Button><Button variant="luxury" asChild><a href={catalogue} target="_blank" rel="noreferrer">Open PDF <ExternalLink /></a></Button></div></div></header><CatalogueViewer /></main>
}
