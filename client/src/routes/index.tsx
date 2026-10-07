import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState, type CSSProperties } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Mail, MapPin, Phone, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import * as Dialog from '@radix-ui/react-dialog'
import { Brand } from '@/components/brand'
import { useForwardSlider } from '@/hooks/use-forward-slider'
import { metadata } from '@/lib/metadata'
import mark from '@/assets/Generated/pinetastic-mark.png'
import forest from '@/assets/Generated/ai-hero-forest.jpg'
import needles from '@/assets/Generated/ai-needles.jpg'
import collect from '@/assets/Generated/ai-collect.jpg'
import processImg from '@/assets/Generated/ai-process.jpg'
import craft from '@/assets/Generated/ai-craft.jpg'
import bag from '@/assets/Generated/col-bag.jpg'
import stationery from '@/assets/Generated/col-stationery.jpg'
import planters from '@/assets/Generated/col-planters.jpg'
import tote from '@/assets/Generated/col-tote.jpg'
import pens from '@/assets/Generated/col-pens.jpg'
import giftkit from '@/assets/Generated/col-giftkit.jpg'
import waistcoat from '@/assets/Generated/col-waistcoat.jpg'
import kritikaAsset from '@/assets/Team/Kritika.jpg'
import krishnaAsset from '@/assets/Team/Krishna.jpg'
import awardAsset from '@/assets/Events/event-award2.jpg'
import recognitionAsset from '@/assets/Events/event-award3.jpg'
import exhibitionAsset from '@/assets/Events/1.jpeg'
import communityAsset from '@/assets/Events/IMG_20250517_170147253_HDR_AE.jpg'
import msmeAsset from '@/assets/Events/event-msme.jpeg'
import productsAsset from '@/assets/Events/IMG_20251205_143639502.jpg'
import iitAsset from '@/assets/B2G/12.jpg'
import nitAsset from '@/assets/B2G/13.jpg'
import himcosteAsset from '@/assets/B2G/14.jpg'
import hpuAsset from '@/assets/B2G/15.jpg'
import cskAsset from '@/assets/B2G/16.jpg'
import csirAsset from '@/assets/B2G/17.jpg'

export const Route = createFileRoute('/')({
  head: () => metadata('Pinetastic — Sustainable products from Himalayan pine needles', 'Pinetastic turns fallen Himalayan pine needles into eco-friendly corporate bags, stationery and planters.'),
  component: Index,
})

const EMAILS = ['kritika@ecothriveinnovations.com', 'kritika@pinetastic.in']
const COMPANY = 'Eco Thrive Innovation Private Limited'
const PHONES = [['+917876522560', '+91 78765 22560'], ['+918580786086', '+91 85807 86086']] as const
const left = [['About', 'about'], ['Process', 'process'], ['Collections', 'collections']] as const
const right = [['Founders', 'founders'], ['Journal', 'journal'], ['Contact', 'contact']] as const
const nav = [...left, ...right]
const delay = (i: number) => ({ '--d': `${i * 0.14}s` }) as CSSProperties

const impact = [
  { title: 'Circular economy', text: 'Pine-needle biomass becomes useful products, closing the waste loop.' },
  { title: 'Rural livelihoods', text: 'Fair, steady income for village artisans and women entrepreneurs.' },
  { title: 'Forest-fire mitigation', text: 'Collecting dry needles lowers wildfire risk across the hills.' },
  { title: 'Himachali heritage', text: 'Traditional Patti weaving, revived for a new generation of gifting.' },
]
const steps = [
  { title: 'Collect', image: collect, alt: 'Hands gathering fallen pine needles into a woven basket', text: 'Fallen chir pine needles are gathered from the forest floor by women from local villages.' },
  { title: 'Transform', image: processImg, alt: 'Pine needles processed into soft natural fibre', text: 'The needles are cleaned and processed into natural fibre and moulded biomass.' },
  { title: 'Craft', image: craft, alt: 'Artisan hands stitching a natural woven bag', text: 'Local artisans finish every piece by hand and with machines, adding authentic Himachali detail.' },
]
const products = [
  { name: 'Conference & Corporate Bags', image: bag, text: 'Pine-cotton bags with a Himachali Patti border, padded laptop space and a branded strap.' },
  { name: 'Sustainable Stationery', image: stationery, text: 'Folder sets, notebooks and conference kits in warm, natural, plastic-free finishes.' },
  { name: 'Pine Biomass Planters', image: planters, text: 'Biodegradable planters moulded from pine-needle biomass — décor that returns to the earth.' },
]
const more = [
  { name: 'Corporate Gift Tote', image: tote, text: 'A reusable tote for events and gifting.' },
  { name: 'Plantable Seed Pens', image: pens, text: 'Paper pens that grow into plants.' },
  { name: 'Him-GI Gift Kit', image: giftkit, text: 'Signature Himachali products in one bag.' },
  { name: 'Himachali Nehru Waistcoat', image: waistcoat, text: 'Pine fibre and wool, with Patti detail.' },
]
const clients = [
  { name: 'IIT Mandi Catalyst', image: iitAsset },
  { name: 'Utthishtati Foundation, ITBI, NIT Hamirpur', image: nitAsset },
  { name: 'CSK HPKV Palampur', image: cskAsset },
  { name: 'CSIR–IHBT Palampur', image: csirAsset },
  { name: 'Himachal Pradesh University', image: hpuAsset },
  { name: 'Himachal Pradesh Council for Science, Technology & Environment (HIMCOSTE)', image: himcosteAsset },
]
const stories = [
  { image: awardAsset, position: 'center', tag: 'Award · 2024', title: 'Second place at Build for the Himalayas', text: 'Recognised at the Himalayan Startup Trek, hosted by IIT Mandi, for sustainable materials and livelihoods.' },
  { image: recognitionAsset, position: 'center 30%', tag: 'Recognition', title: 'Honoured by the HP State Pollution Control Board', text: 'Third prize for turning forest waste into useful, eco-friendly products.' },
  { image: exhibitionAsset, position: 'center 25%', tag: 'Exhibition', title: 'Leaders visit the Pinetastic stall', text: 'Dignitaries explored pine-needle products at a state exhibition.' },
  { image: communityAsset, position: 'center 30%', tag: 'Community', title: 'At the Shimla Mashobra Marathon', text: 'Pine-needle bags joined runners and visitors in May 2025.' },
  { image: msmeAsset, position: 'center 22%', tag: 'Enterprise', title: 'Meeting makers and markets', text: 'The collection was presented to partners at an MSME exhibition.' },
  { image: productsAsset, position: 'center 40%', tag: 'Showcase', title: 'The collection on display', text: 'Bags, stationery and planters shown together for buyers and visitors.' },
]

function TrustedCarousel() {
  const { ref, index, animate, onEnd, next, prev } = useForwardSlider(clients.length, { firstDelay: 1000, interval: 2500, direction: 'rtl' })
  return (
    <div ref={ref}>
      <div className="client-window">
       <div className={`client-track ${animate ? '' : 'instant'}`} style={{ '--i': index + 2 } as CSSProperties} onTransitionEnd={e => { if (e.target === e.currentTarget) onEnd() }}>
        {[...clients.slice(-2), ...clients, ...clients.slice(0, 3)].map((c, i) => (
          <div key={i} className={`client-slide ${i === index + 2 ? 'is-main' : Math.abs(i - index - 2) === 1 ? 'is-neighbour' : 'is-distant'}`} aria-hidden={Math.abs(i - index - 2) > 1}><div className="logo-card">
            <strong>{c.name}</strong>
            <div className="seal"><img src={c.image} alt={c.name} width={500} height={500} /></div>
            <small>Conference Kits &amp; Bags</small>
          </div></div>
        ))}
       </div>
      </div>
      <div className="carousel-controls">
        <Button variant="ghost" size="icon" className="round-button" aria-label="Previous institution" onClick={prev}><ArrowLeft /></Button>
        <Button variant="ghost" size="icon" className="round-button" aria-label="Next institution" onClick={next}><ArrowRight /></Button>
      </div>
    </div>
  )
}

function StorySlider() {
  const n = stories.length
  const { ref, index, animate, onEnd, next, prev } = useForwardSlider(n, { firstDelay: 2000, interval: 4000, direction: 'rtl' })
  const [visible, setVisible] = useState(3)
  const items = [...stories, ...stories]

  useEffect(() => {
    const update = () => setVisible(window.innerWidth <= 640 ? 1 : window.innerWidth <= 1024 ? 2 : 3)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  const pos = index % n

  return (
    <div ref={ref}>
      <div className="slider-head">
        <h3>More from the field</h3>
        <div className="controls">
          <Button variant="ghost" size="icon" className="round-button" aria-label="Previous story" onClick={prev}><ArrowLeft /></Button>
          <Button variant="ghost" size="icon" className="round-button" aria-label="Next story" onClick={next}><ArrowRight /></Button>
        </div>
      </div>
      <div className="slider" style={{ '--v': visible } as CSSProperties}>
        <div className={`slider-track ${animate ? '' : 'instant'}`} style={{ '--i': index } as CSSProperties} onTransitionEnd={e => { if (e.target === e.currentTarget) onEnd() }}>
          {items.map((s, i) => (
            <article key={i} className="figure clipping" aria-hidden={i < index || i >= index + visible}>
              <div className="clip-mast"><span>The Field Journal</span><span>{s.tag}</span></div>
              <div className="frame ratio-32"><img src={s.image} alt={s.title} width={1600} height={1066} loading="eager" decoding="async" style={{ objectPosition: s.position }} /></div>
              <div className="story-meta"><span className="label">{s.tag}</span><span className="num">No. {String((i % n) + 1).padStart(2, '0')}</span></div>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="progress"><i style={{ width: `${((pos + 1) / n) * 100}%` }} /></div>
      <div className="progress-count"><span>{String(pos + 1).padStart(2, '0')}</span> / {String(n).padStart(2, '0')}</div>
    </div>
  )
}

function Index() {
  const [scrolled, setScrolled] = useState(false)
  const [current, setCurrent] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 641px)')
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false) }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  useEffect(() => {
    const bar = document.querySelector<HTMLElement>('.scroll-progress')
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      if (bar) {
        const max = document.documentElement.scrollHeight - window.innerHeight
        bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const reveal = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); reveal.unobserve(e.target) }
    }), { threshold: 0, rootMargin: '0px 0px -24px 0px' })
    const fx = ['fx-left', 'fx-up', 'fx-right', 'fx-zoom', 'fx-down', 'fx-tilt']
    // Images in the same group share one effect; each new group gets a different one.
    const groupFx = new Map<Element, string>()
    document.querySelectorAll('.reveal, .wipe').forEach(el => {
      if (el.classList.contains('wipe') || el.querySelector('.frame')) {
        const group = el.parentElement ?? el
        if (!groupFx.has(group)) groupFx.set(group, fx[groupFx.size % fx.length] ?? 'fx-up')
        el.classList.add(groupFx.get(group) ?? 'fx-up')
      }
      reveal.observe(el)
    })
    const spy = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setCurrent(e.target.id) }), { rootMargin: '-45% 0px -50% 0px' })
    nav.forEach(([, id]) => { const el = document.getElementById(id); if (el) spy.observe(el) })
    return () => { window.removeEventListener('scroll', onScroll); reveal.disconnect(); spy.disconnect() }
  }, [])

  const links = (items: typeof nav) => items.map(([label, id]) => <a key={id} href={`#${id}`} className={current === id ? 'active' : ''}>{label}</a>)

  return <>
    <div className="scroll-progress" aria-hidden="true" />
    <header className={`site-header site-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="topbar">
        <Brand tagline />
        <nav className="nav-notch" aria-label="Main navigation">{links(nav)}</nav>
        <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <Dialog.Trigger asChild><button type="button" className="nav-toggle" aria-label="Open navigation" aria-expanded={menuOpen}><Menu /></button></Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="mobile-nav-overlay" />
            <Dialog.Content className="mobile-nav-panel" aria-describedby={undefined}>
              <div className="mobile-nav-heading"><Dialog.Title>PINETASTIC</Dialog.Title><Dialog.Close asChild><button type="button" className="mobile-nav-close" aria-label="Close navigation"><X /></button></Dialog.Close></div>
              <nav className="mobile-nav-links" aria-label="Mobile navigation">{nav.map(([label, id], i) => <Dialog.Close asChild key={id}><a href={`#${id}`} className={current === id ? 'active' : ''}><span className="mobile-nav-number">{String(i + 1).padStart(2, '0')}</span><span>{label}</span><ArrowUpRight /></a></Dialog.Close>)}</nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>

    <main>
      <section className="hero">
        <img className="hero-bg" src={forest} alt="Himalayan pine forest at sunrise, floor covered with fallen pine needles" width={1920} height={1088} fetchPriority="high" />
        <div className="wrap hero-in">
          <img className="hero-mark" src={mark} alt="" width={600} height={452} />
          <p className="kicker center">Eco-friendly · Himalayan pine</p>
          <p className="hero-brand">Pinetastic</p>
          <p className="hero-company">{COMPANY}</p>
          <h1>Sustainable products, crafted from Himalayan pine needles.</h1>
          <div className="hero-actions">
            <Button variant="luxury" className="on-image" asChild><a href="#collections">Explore Collections <ArrowRight /></a></Button>
            <Button variant="editorial" className="on-image" asChild><Link to="/catalog">View Catalogue</Link></Button>
          </div>
        </div>
        <div className="hero-facts"><div className="wrap">
          <div><strong>Pine-needle fibre</strong>Material innovation from forest waste</div>
          <div><strong>Himachali craft</strong>Handmade with local artisans</div>
          <div><strong>Award-winning</strong>Himalayan Startup Trek 2024, IIT Mandi</div>
        </div></div>
      </section>

      <div className="marquee" aria-hidden="true"><div className="marquee-track">
        {[0, 1].map(k => <div key={k} style={{ display: 'flex' }}>{['Eco-friendly by nature', 'Pine-needle fibre', 'Handcrafted in the Himalayas', 'Circular by design', 'Made by local women'].map(t => <span key={t}>{t}</span>)}</div>)}
      </div></div>

      <section className="section" id="about"><div className="wrap about-grid">
        <figure className="figure wipe">
          <div className="frame ratio-45"><img src={needles} alt="Fallen pine needles beside spun pine fibre" width={1200} height={1504} loading="eager" decoding="async" /></div>
          <figcaption className="caption"><b>Fig. 01</b>Fallen chir pine needles and the natural fibre spun from them.</figcaption>
        </figure>
        <div className="about-copy reveal">
          <p className="kicker">Our story</p>
          <h2 className="h2">Nature, given a new purpose.</h2>
          <p className="lead" style={{ marginTop: 24 }}>Every year, Himalayan forests are carpeted with dry pine needles that feed forest fires. Pinetastic sees a material where others see waste.</p>
          <p className="lead">We turn those needles into sustainable products — and create steady income for the rural women who collect and craft them.</p>
          <div className="mission">
            <span className="label">Our mission</span>
            <p>To turn Himalayan pine biomass into eco-friendly products, creating livelihoods for rural artisans while conserving the forests they call home.</p>
          </div>
        </div>
      </div></section>

      <section className="section sand impact"><div className="wrap">
        <div className="center-head reveal">
          <p className="kicker center">Our impact</p>
          <h2 className="h2">Good for forests. Good for people.</h2>
        </div>
        <div className="impact-grid">
          {impact.map((p, i) => (
            <article key={p.title} className="reveal" style={delay(i)}>
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </div></section>

      <section className="section" id="process"><div className="wrap">
        <div className="section-head reveal">
          <div><p className="kicker">The process</p><h2 className="h2">From forest floor<br />to finished piece.</h2></div>
          <p className="lead">Three careful steps, carried out entirely in the hills of Himachal Pradesh.</p>
        </div>
        <div className="process-grid">
          {steps.map((s, i) => (
            <article key={s.title} className="story figure wipe" style={delay(i)}>
              <div className="frame ratio-45"><img src={s.image} alt={s.alt} width={1200} height={1500} loading="eager" decoding="async" /></div>
              <div className="story-meta"><span className="label">Step</span><span className="num">{String(i + 1).padStart(2, '0')}</span></div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </div></section>

      <section className="section paper" id="collections"><div className="wrap">
        <div className="section-head reveal">
          <div><p className="kicker">Collections</p><h2 className="h2">Thoughtfully made.</h2></div>
          <Button variant="editorial" asChild><Link to="/catalog">Full catalogue <ArrowUpRight /></Link></Button>
        </div>
        <div className="products">
          {products.map((p, i) => (
            <Link key={p.name} to="/catalog" className="story product figure wipe" style={delay(i)}>
              <div className="frame ratio-45"><img src={p.image} alt={p.name} width={1200} height={1504} loading="eager" decoding="async" /></div>
              <div className="story-meta"><span className="label">Collection</span><span className="num">No. {String(i + 1).padStart(2, '0')}</span></div>
              <h3>{p.name}</h3>
              <p>{p.text}</p>
              <span className="text-link">View in catalogue <ArrowUpRight /></span>
            </Link>
          ))}
        </div>
        <div className="more-head reveal"><h3>More from the catalogue</h3></div>
        <div className="more-grid">
          {more.map((p, i) => (
            <Link key={p.name} to="/catalog" className="mini figure wipe" style={delay(i)}>
              <div className="frame ratio-11"><img src={p.image} alt={p.name} width={1200} height={1200} loading="eager" decoding="async" /></div>
              <h4>{p.name}</h4>
              <p>{p.text}</p>
            </Link>
          ))}
        </div>
        <div className="made-for reveal">
          <div><span className="label">Designed for</span><strong>Conferences</strong><span>Professional and purposeful.</span></div>
          <div><span className="label">Ideal for</span><strong>Corporate gifting</strong><span>Impressions that last.</span></div>
          <div><span className="label">Perfect for</span><strong>Branded events</strong><span>Eco-conscious by choice.</span></div>
        </div>
      </div></section>

      <section className="section sand trusted" aria-labelledby="trusted-title"><div className="wrap">
        <div className="center-head reveal">
          <p className="kicker center">B2G Clients</p>
          <h2 className="h2" id="trusted-title">Trusted by government institutions.</h2>
          <p className="lead">Government institutes and departments across Himachal Pradesh that share our purpose.</p>
        </div>
        <TrustedCarousel />
      </div></section>

      <section className="section" id="founders"><div className="wrap founders-wrap">
        <div className="reveal">
          <p className="kicker">Founders</p>
          <h2 className="h2">The people behind Pinetastic.</h2>
          <p className="lead" style={{ marginTop: 22 }}>Building a circular future for Himalayan forests and the communities around them.</p>
        </div>
        <div className="founders">
          <figure className="founder figure wipe"><div className="frame ratio-11"><img src={kritikaAsset} alt="Kritika Sharma" width={500} height={500} loading="eager" decoding="async" /></div><h3>Kritika Sharma</h3><p>Founder</p></figure>
          <figure className="founder figure wipe" style={delay(1)}><div className="frame ratio-11"><img src={krishnaAsset} alt="Krishna Sharma" width={500} height={500} loading="eager" decoding="async" /></div><h3>Krishna Sharma</h3><p>Co-founder</p></figure>
        </div>
      </div></section>

      <section className="section paper" id="journal"><div className="wrap">
        <div className="section-head reveal">
          <div><p className="kicker">Journal</p><h2 className="h2">In the news.</h2></div>
          <p className="lead">Moments of recognition, exhibitions and community.</p>
        </div>
        <StorySlider />
      </div></section>

      <section className="section contact" id="contact"><div className="wrap">
        <div className="contact-card">
          <figure className="contact-still">
            <img src={bag} alt="Pine-fibre conference bag with Himachali Patti detailing" width={1200} height={1500} loading="eager" decoding="async" />
            <figcaption><span>Pinetastic</span>Rooted in nature. Made for your next occasion.</figcaption>
          </figure>
          <div className="contact-body">
            <p className="kicker">Contact</p>
            <h2>Let's work together.</h2>
            <p className="lead">Corporate gifting, conference kits and bulk orders for events of every size.</p>
            <dl className="contact-details">
              <div><dt><Mail />Write to us</dt><dd>{EMAILS.map(e => <a key={e} href={`mailto:${e}`}><span>{e}</span><ArrowUpRight /></a>)}</dd></div>
              <div><dt><Phone />Call us</dt><dd>{PHONES.map(([t, l]) => <a key={t} href={`tel:${t}`}><span>{l}</span><ArrowUpRight /></a>)}</dd></div>
              <div><dt><MapPin />Visit our studio</dt><dd><address>H. No. 133/7, Moti Bazar, Mandi, Himachal Pradesh 175001, India</address></dd></div>
            </dl>
            <div className="contact-actions">
              <Button variant="editorial" asChild><Link to="/catalog">View Catalogue <BookOpen /></Link></Button>
            </div>
          </div>
        </div>
      </div></section>
    </main>

    <footer className="site-footer"><div className="wrap">
      <div className="footer-mark">
        <img src={mark} alt="Pinetastic emblem" width={600} height={452} loading="eager" decoding="async" />
        <strong>PINETASTIC</strong>
        <p className="footer-company">{COMPANY}</p>
        <p>Eco-friendly products · Rooted in nature</p>
      </div>
      <div className="footer-grid">
        <div><h4>Explore</h4><ul>{left.map(([l, id]) => <li key={id}><a href={`#${id}`}>{l}</a></li>)}</ul></div>
        <div><h4>Company</h4><ul>{right.map(([l, id]) => <li key={id}><a href={`#${id}`}>{l}</a></li>)}</ul></div>
        <div><h4>Resources</h4><ul><li><Link to="/catalog">Catalogue</Link></li><li><Link to="/qr">Quick access</Link></li></ul></div>
        <div><h4>Contact</h4><ul>{EMAILS.map(e => <li key={e}><a href={`mailto:${e}`}>{e}</a></li>)}{PHONES.map(([t, l]) => <li key={t}><a href={`tel:${t}`}>{l}</a></li>)}</ul></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} {COMPANY}</span><a href="https://www.pinetastic.in">www.pinetastic.in</a></div>
    </div></footer>
  </>
}