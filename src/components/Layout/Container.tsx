import styles from './Container.module.css'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  fluid?: boolean
}

export default function Container({ children, className, fluid = false }: ContainerProps) {
  return (
    <div className={`${styles.container} ${fluid ? styles.fluid : ''} ${className || ''}`}>
      {children}
    </div>
  )
}
