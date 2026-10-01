const particles = Array.from({ length: 72 }, (_, index) => ({
  id: index,
  left: `${(index * 47) % 100}%`,
  top: `${(index * 31) % 100}%`,
  delay: `${(index * 0.37) % 14}s`,
  duration: `${14 + (index % 9)}s`,
  size: `${1 + (index % 3)}px`,
}))

function ParticleBackground() {
  return (
    <div className="particle-field" aria-hidden="true">
      {particles.map((particle) => (
        <span
          className="particle"
          key={particle.id}
          style={{ left: particle.left, top: particle.top, animationDelay: particle.delay, animationDuration: particle.duration, width: particle.size, height: particle.size }}
        />
      ))}
    </div>
  )
}

export default ParticleBackground
