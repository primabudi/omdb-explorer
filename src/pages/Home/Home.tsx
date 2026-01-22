import { searchMovies } from '../../api/omdbApi'

function Home() {
  const handleTestSearch = async () => {
    const result = await searchMovies('Batman', 1)
    console.log('Search result:', result)
  }

  return (
    <div>
      <input type="text" placeholder="Search movies..." />
      <button onClick={handleTestSearch}>Test Search API</button>
      <p>Start searching to find movies</p>
    </div>
  )
}

export default Home
