import { useEffect, useRef, useCallback } from 'react'
import styles from './MouseTrail.module.css'

interface Particle {
  x: number
  y: number
  size: number
  opacity: number
  velocityX: number
  velocityY: number
  color: string
  element: HTMLDivElement
}

const colors = [
  'rgba(139, 92, 246, 0.6)',
  'rgba(99, 102, 241, 0.6)',
  'rgba(236, 72, 153, 0.6)',
  'rgba(34, 211, 238, 0.6)',
  'rgba(167, 139, 250, 0.6)',
  'rgba(244, 114, 182, 0.6)',
]

export default function MouseTrail() {
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()
  const lastEmitRef = useRef(0)

  const createParticle = useCallback((x: number, y: number) => {
    if (!containerRef.current) return

    const particle = document.createElement('div')
    particle.className = styles.particle

    const size = Math.random() * 6 + 3
    const color = colors[Math.floor(Math.random() * colors.length)]
    
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`
    particle.style.backgroundColor = color
    particle.style.left = `${x}px`
    particle.style.top = `${y}px`

    containerRef.current.appendChild(particle)

    const velocityX = (Math.random() - 0.5) * 2
    const velocityY = (Math.random() - 0.5) * 2 - 0.5

    particlesRef.current.push({
      x,
      y,
      size,
      opacity: 1,
      velocityX,
      velocityY,
      color,
      element: particle,
    })
  }, [])

  const updateParticles = useCallback(() => {
    const particles = particlesRef.current
    const toRemove: number[] = []

    particles.forEach((p, index) => {
      p.x += p.velocityX
      p.y += p.velocityY
      p.opacity -= 0.015
      p.size *= 0.98

      p.element.style.left = `${p.x}px`
      p.element.style.top = `${p.y}px`
      p.element.style.opacity = `${p.opacity}`
      p.element.style.transform = `scale(${p.size / 5})`

      if (p.opacity <= 0) {
        toRemove.push(index)
      }
    })

    for (let i = toRemove.length - 1; i >= 0; i--) {
      const index = toRemove[i]
      const particle = particles[index]
      particle.element.remove()
      particles.splice(index, 1)
    }

    animationRef.current = requestAnimationFrame(updateParticles)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      
      const now = Date.now()
      if (now - lastEmitRef.current > 30) {
        createParticle(e.clientX, e.clientY)
        lastEmitRef.current = now
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (!touch) return
      
      mouseRef.current = { x: touch.clientX, y: touch.clientY }
      
      const now = Date.now()
      if (now - lastEmitRef.current > 50) {
        createParticle(touch.clientX, touch.clientY)
        lastEmitRef.current = now
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)

    animationRef.current = requestAnimationFrame(updateParticles)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      particlesRef.current.forEach(p => p.element.remove())
      particlesRef.current = []
    }
  }, [createParticle, updateParticles])

  return <div ref={containerRef} className={styles.container} />
}