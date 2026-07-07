import AppRouter from './router'
import Stars from './components/Stars/Stars'
import MouseTrail from './components/MouseTrail/MouseTrail'
import './theme/global.css'

export default function App() {
  return (
    <>
      <Stars />
      <MouseTrail />
      <AppRouter />
    </>
  )
}