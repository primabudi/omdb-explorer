import { Link } from 'react-router-dom'
import s from './Header.module.css'

interface HeaderProps {
  children?: React.ReactNode
}

function Header({ children }: HeaderProps) {
  return (
    <header className={s.header}>
      <h1 className={s.title}>
        <Link to="/">OMDB Explorer</Link>
      </h1>
      <p className={s.subtitle}>Search and discover movies</p>
      {children}
    </header>
  )
}

export default Header

