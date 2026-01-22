import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Home from './pages/Home/Home'
import MovieDetail from './pages/MovieDetail/MovieDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movie/:id" element={<MovieDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
