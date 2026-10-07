import { Link } from '@tanstack/react-router'
import mark from '@/assets/Generated/pinetastic-mark.png'

export function Brand({ tagline = false }: { tagline?: boolean }) {
  return (
    <Link to="/" className="brand" aria-label="Pinetastic home">
      <img src={mark} alt="" width={600} height={452} />
      <span>PINETASTIC{tagline && <small className="brand-tag">Eco Thrive Innovations</small>}</span>
    </Link>
  )
}