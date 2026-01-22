import { searchMovies } from './api/omdbApi'

function App() {
  
  const handleTestSearch = async () => {
    const result = await searchMovies('Batman', 1)
    console.log('Search result:', result)
  }

  return (
    <div>
      <header>
        <h1>OMDB Explorer</h1>
        <p>Search and discover movies</p>
      </header>
      <main>
        <input type="text" placeholder="Search movies..." />
        <button onClick={handleTestSearch}>Test Search API</button>
        <p>Start searching to find movies</p>
      </main>
    </div>
  )
}

export default App
