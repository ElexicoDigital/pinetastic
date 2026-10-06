import { Link } from '@tanstack/react-router'
import mark from '@/assets/Generated/pinetastic-mark.png'

export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="Pinetastic home">
      <img src={mark} alt="" width={600} height={452} />
      <span>PINETASTIC</span>
    </Link>
  )
}
