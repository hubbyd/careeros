import { useEffect, useRef } from 'react'

export default function Stars() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const starCount = 100

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div')
      star.className = 'star'
      star.style.left = `${Math.random() * 100}%`
      star.style.top = `${Math.random() * 100}%`
      const size = Math.random() * 3 + 1
      star.style.width = `${size}px`
      star.style.height = `${size}px`
      star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`)
      star.style.setProperty('--opacity', `${Math.random() * 0.5 + 0.3}`)
      star.style.animationDelay = `${Math.random() * 5}s`
      container.appendChild(star)
    }

    const shootingStarCount = 3
    for (let i = 0; i < shootingStarCount; i++) {
      const shootingStar = document.createElement('div')
      shootingStar.className = 'shooting-star'
      shootingStar.style.setProperty('--top', `${Math.random() * 40 + 10}%`)
      shootingStar.style.setProperty('--left', '-100px')
      shootingStar.style.setProperty('--duration', `${Math.random() * 3 + 3}s`)
      shootingStar.style.setProperty('--delay', `${Math.random() * 10 + 5}s`)
      container.appendChild(shootingStar)
    }

    return () => {
      container.innerHTML = ''
    }
  }, [])

  return <div ref={containerRef} className="stars-container" />
}
