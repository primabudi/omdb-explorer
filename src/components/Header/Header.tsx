import { Link } from 'react-router-dom'

interface HeaderProps {
  children?: React.ReactNode
}

function Header({ children }: HeaderProps) {
  return (
    <header>
      <Link to="/">
        <h1>OMDB Explorer</h1>
      </Link>
      <p>Search and discover movies</p>
      {children}
    </header>
  )
}

export default Header
