import SearchBox from '../../components/SearchBox/SearchBox'
import { useAppSelector } from '../../hooks/redux'

function Home() {
  const searchQuery = useAppSelector((state) => state.movies.searchQuery)

  return (
    <div>
      <SearchBox />
      {searchQuery ? (
        <p>Searching for: {searchQuery}</p>
      ) : (
        <p>Start searching to find movies</p>
      )}
    </div>
  )
}

export default Home
