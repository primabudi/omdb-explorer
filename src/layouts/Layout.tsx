import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import s from './Layout.module.css'

function Layout() {
  return (
    <div className={s.container}>
      <Header />
      <main className={s.main}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout

