import { useParams, Link } from 'react-router-dom'

function MovieDetail() {
  const { id } = useParams<{ id: string }>()

  return (
    <div>
      <Link to="/">← Back to Home</Link>
      <h2>Movie Detail</h2>
      <p>Movie ID: {id}</p>
    </div>
  )
}

export default MovieDetail
