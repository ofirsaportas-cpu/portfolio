import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import heroImg           from './assets/hero.png'
import avatarFace        from './assets/avatar-face.png'
import imgVoyaPhone      from './assets/project-voya-phone.png'
import imgWaze           from './assets/project-waze-2.png'
import imgAdopt          from './assets/project-adopt-2.png'
import imgWedMatch       from './assets/project-wedmatch-2.png'
import imgMemoreA        from './assets/project-memore-a.png'
import imgMemoreB        from './assets/project-memore-b.png'
import './App.css'

const PROJECTS = [
  {
    num: '01',
    tag: 'UX / UI',
    title: 'VOYA',
    description: 'Redesigned the onboarding',
    pills: ['Onboarding', 'UI Design', 'Product Design', 'Usability Testing'],
    accent: '#beeae4',
    link: '/voya.html',
    imageRight: true,
    renderImage: () => (
      <div className="proj-img-container">
        <img src="/images/voya/cover.png" className="proj-img-voya-phone" alt="" />
      </div>
    ),
  },
  {
    num: '02',
    tag: 'UX / UI Project',
    title: 'AdoptMe',
    description: 'Connecting new adopters with experienced pet parents',
    pills: ['UX Research', 'UI Design', 'Prototyping', 'Usability Testing'],
    accent: '#f43f5e',
    link: '/adopt-a-mentor.html',
    imageRight: false,
    renderImage: () => (
      <div className="proj-img-container">
        <img src={imgAdopt} className="proj-img-adopt" alt="" />
      </div>
    ),
  },
  {
    num: '03',
    tag: 'Concept Project',
    title: 'Feature Concept',
    description: 'Street parking feature design for Waze',
    pills: ['UX Strategy', 'Feature Design', 'UI Design'],
    accent: '#32ccfe',
    link: '/waze.html',
    imageRight: true,
    renderImage: () => (
      <div className="proj-img-container">
        <img src={imgWaze} className="proj-img-waze" alt="" />
      </div>
    ),
  },
  // WedMatch hidden — restore by uncommenting
  // {
  //   num: '04',
  //   tag: 'MVP · AI Project',
  //   title: 'WedMatch',
  //   description: 'AI based app designed to help singles connect naturally at weddings.',
  //   pills: ['AI Project', 'UI Design', 'Interviews', 'Accessibility'],
  //   accent: '#f80708',
  //   link: '/wedmatch.html',
  //   imageRight: false,
  //   renderImage: () => (
  //     <div className="proj-img-container">
  //       <img src={imgWedMatch} className="proj-img-wedmatch" alt="" />
  //     </div>
  //   ),
  // },
  {
    num: '04',
    tag: 'UI / UX',
    title: 'Memore',
    description: 'A space to preserve memories and share loss together',
    pills: ['UX Audit', 'Information Architecture', 'UI Design', 'Motion'],
    accent: '#f471b6',
    link: '/memore.html',
    imageRight: false,
    renderImage: () => (
      <div className="proj-img-container">
        <img src="/images/memore/COVER.png" className="proj-img-memore-a" alt="" />
      </div>
    ),
  },
]

const PARTICLES = [
  { x: 74.8, y: 47.3, s: 3.3, o: 0.49, d: 0,   dur: 4.8 },
  { x: 44.8, y: 52.8, s: 3.0, o: 0.45, d: 0.5, dur: 5.2 },
  { x: 50.8, y: 51.1, s: 3.2, o: 0.32, d: 1.0, dur: 4.3 },
  { x: 29.5, y: 74.9, s: 3.2, o: 0.43, d: 1.5, dur: 6.1 },
  { x: 15.6, y: 92.2, s: 3.1, o: 0.41, d: 2.0, dur: 5.5 },
  { x: 3.9,  y: 58.4, s: 1.3, o: 0.50, d: 2.5, dur: 4.0 },
  { x: 52.3, y: 36.8, s: 2.3, o: 0.42, d: 0.3, dur: 5.8 },
  { x: 51.4, y: 15.8, s: 2.9, o: 0.17, d: 1.2, dur: 6.5 },
  { x: 39.2, y: 73.1, s: 1.1, o: 0.18, d: 3.0, dur: 4.7 },
  { x: 13.5, y: 69.6, s: 3.2, o: 0.18, d: 0.8, dur: 5.3 },
  { x: 50.6, y: 86.1, s: 3.0, o: 0.37, d: 2.1, dur: 4.5 },
  { x: 33.8, y: 57.4, s: 1.1, o: 0.36, d: 1.7, dur: 6.0 },
  { x: 75.2, y: 92.6, s: 3.0, o: 0.38, d: 0.2, dur: 5.1 },
  { x: 27.5, y: 17.9, s: 3.3, o: 0.41, d: 3.5, dur: 4.9 },
  { x: 72.5, y: 32.8, s: 3.2, o: 0.17, d: 1.1, dur: 5.7 },
  { x: 82.5, y: 27.5, s: 2.5, o: 0.46, d: 2.8, dur: 6.2 },
  { x: 7.8,  y: 93.4, s: 2.0, o: 0.28, d: 0.6, dur: 4.4 },
  { x: 12.5, y: 25.4, s: 2.1, o: 0.39, d: 4.0, dur: 5.6 },
  { x: 85.0, y: 20.0, s: 2.5, o: 0.30, d: 1.8, dur: 4.2 },
  { x: 60.0, y: 80.0, s: 1.8, o: 0.25, d: 2.4, dur: 6.3 },
  { x: 90.0, y: 60.0, s: 2.8, o: 0.40, d: 3.2, dur: 5.0 },
  { x: 20.0, y: 35.0, s: 1.5, o: 0.35, d: 0.9, dur: 4.6 },
  { x: 65.0, y: 10.0, s: 2.0, o: 0.30, d: 1.4, dur: 5.9 },
  { x: 40.0, y: 15.0, s: 3.0, o: 0.45, d: 2.7, dur: 4.1 },
  { x: 95.0, y: 45.0, s: 1.8, o: 0.38, d: 1.6, dur: 6.4 },
]

const STATS = [
  { value: '2+',   label: 'Years of Experience' },
  { value: '15+',  label: 'Projects Completed'  },
  { value: '100%', label: 'User-Centered'        },
]

function ProjectRow({ project, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { imageRight } = project

  const textCol = (
    <div className="proj-text-col">
      <div className="proj-num">{project.num}</div>
      <p className="proj-tag" style={{ color: project.accent }}>{project.tag.toUpperCase()}</p>
      <h3 className="proj-title">{project.title}</h3>
      <p className="proj-desc">{project.description}</p>
      <div className="proj-pills">
        {project.pills.map(p => (
          <span key={p} className="proj-pill">{p}</span>
        ))}
      </div>
      <a
        href={project.link}
        className="proj-btn"
        style={{ '--btn-accent': project.accent }}
      >
        VIEW PROJECT &nbsp;→
      </a>
    </div>
  )

  const imageCol = (
    <motion.div
      className="proj-image-col"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {project.renderImage()}
    </motion.div>
  )

  return (
    <motion.div
      ref={ref}
      className="proj-row"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      {imageRight ? textCol : imageCol}
      {imageRight ? imageCol : textCol}
    </motion.div>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const heroRef         = useRef(null)
  const projectsHeadRef = useRef(null)

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroImageY  = useTransform(heroScroll, [0, 1], [0, -100])
  const heroTextY   = useTransform(heroScroll, [0, 1], [0, -50])
  const heroOpacity = useTransform(heroScroll, [0, 0.75], [1, 0])
  const progressW   = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const headInView  = useInView(projectsHeadRef, { once: true, margin: '-60px' })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="portfolio">
      <motion.div
        className="scroll-progress"
        style={{ width: progressW }}
        aria-hidden="true"
      />

      <motion.nav
        className={`navbar${scrolled ? ' scrolled' : ''}`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Main navigation"
      >
        <div className="nav-brand">
          <img src={avatarFace} className="nav-avatar" alt="" />
          <span className="nav-name">Ofir Saportas</span>
        </div>
        <div className="nav-links">
          <a href="#projects">Projects</a>
          <a href="/about.html">About Me</a>
        </div>
      </motion.nav>

      {/* ── Hero ── */}
      <section ref={heroRef} className="hero" aria-label="Introduction">
        <div className="blob blob-indigo" aria-hidden="true" />
        <div className="blob blob-pink"   aria-hidden="true" />
        <div className="blob blob-green"  aria-hidden="true" />

        <div className="particles" aria-hidden="true">
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className="particle"
              style={{
                left: `${p.x}%`, top: `${p.y}%`,
                width: `${p.s}px`, height: `${p.s}px`,
                opacity: p.o,
                animationDelay: `${p.d}s`,
                '--dur': `${p.dur}s`,
              }}
            />
          ))}
        </div>

        <div className="hero-inner">
          <motion.div className="hero-text" style={{ y: heroTextY, opacity: heroOpacity }}>
            <motion.p
              className="hero-eyebrow"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              UX/UI Designer
            </motion.p>
            <motion.h1
              className="hero-headline"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              i like to<br />fix things.
            </motion.h1>
            <motion.p
              className="hero-body"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
            >
              when I see a problem - whether it&apos;s a product, an app, or a system,
              I start thinking about the best way to improve it. I enjoy finding
              creative solutions that make experiences simpler and more intuitive.
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href="#contact" className="btn-primary">Get In Touch</a>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-image"
            style={{ y: heroImageY }}
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero-image-glow" aria-hidden="true" />
            <img src={heroImg} alt="Ofir Saportas" />
          </motion.div>
        </div>

        <motion.div
          className="scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.7 }}
          aria-hidden="true"
        >
          <span>scroll</span>
          <div className="scroll-line-anim" />
        </motion.div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="projects-section" aria-label="Projects">
        <div className="projects-inner">

          {/* Header */}
          <motion.div
            ref={projectsHeadRef}
            className="projects-header"
            initial={{ opacity: 0, y: 32 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="projects-heading">My Projects</h2>
          </motion.div>

          {/* Rows */}
          <div className="projects-list">
            {PROJECTS.map((project, i) => (
              <ProjectRow key={project.num} project={project} index={i} />
            ))}
          </div>

        </div>
      </section>

      <footer id="contact" className="contact-footer">
        <div className="contact-footer-inner">
          <p className="contact-eyebrow">✦ Contact</p>
          <h2 className="contact-heading">
            Let&apos;s build<br />
            <span className="contact-heading-yellow">something great.</span>
          </h2>
          <a href="mailto:ofirsaportas@gmail.com" className="contact-email-btn">
            <span>✉</span>
            ofirsaportas@gmail.com
          </a>
          <div className="contact-social">
            <a href="https://www.linkedin.com/in/ofir-saportas/?skipRedirect=true" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
        <div className="contact-footer-bottom">
          <span className="site-footer-name">Ofir Saportas</span>
          <span className="site-footer-copy">Designed &amp; built with ♥ - All rights reserved © 2026</span>
        </div>
      </footer>
    </div>
  )
}
