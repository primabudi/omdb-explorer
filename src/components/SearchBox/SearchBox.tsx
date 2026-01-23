import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setSearchQuery } from '../../features/movies/moviesSlice'
import useDebounce from '../../hooks/useDebounce'

function SearchBox() {
  const dispatch = useAppDispatch()
  const searchQuery = useAppSelector((state) => state.movies.searchQuery)
  const [inputValue, setInputValue] = useState(searchQuery)
  const debouncedValue = useDebounce(inputValue, 300)

  useEffect(() => {
    dispatch(setSearchQuery(debouncedValue))
  }, [debouncedValue, dispatch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search movies..."
      />
    </div>
  )
}

export default SearchBox

