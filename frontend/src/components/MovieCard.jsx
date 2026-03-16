import { Link } from "react-router-dom"
import "../styles/movieCard.css"

function MovieCard({ movie }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image"

  const year = movie.displayDate
    ? new Date(movie.displayDate).getFullYear()
    : "Unknown"

  return (
    <div className="card h-100 shadow-sm movie-card">
      <img
        src={imageUrl}
        alt={movie.displayTitle}
        className="card-img-top movie-card__image"
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{movie.displayTitle}</h5>

        <p className="card-text mb-3">
          <strong>Year:</strong> {year}
        </p>

        <Link
          to={`/details/${movie.media_type}/${movie.id}`}
          className="btn btn-primary mt-auto"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default MovieCard