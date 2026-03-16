import { useEffect, useMemo, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getTitleDetails } from "../services/tmdb"
import "../styles/movieDetails.css"

function MovieDetails() {
  const { id, mediaType } = useParams()
  const [title, setTitle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchTitle() {
      try {
        setLoading(true)
        setError("")
        const data = await getTitleDetails(id, mediaType)
        setTitle(data)
      } catch (err) {
        console.error("DETAILS ERROR:", err)
        setError(err.message || "Could not load details.")
      } finally {
        setLoading(false)
      }
    }

    fetchTitle()
  }, [id, mediaType])

  const displayTitle = useMemo(() => {
    return title?.title || title?.name || "Untitled"
  }, [title])

  const displayDate = useMemo(() => {
    return title?.release_date || title?.first_air_date || ""
  }, [title])

  const displayYear = displayDate ? new Date(displayDate).getFullYear() : "N/A"

  const displayRuntime = useMemo(() => {
    if (!title) return "N/A"

    if (mediaType === "movie") {
      return title.runtime ? `${title.runtime} min` : "N/A"
    }

    return title.episode_run_time?.length
      ? `${title.episode_run_time[0]} min`
      : "N/A"
  }, [title, mediaType])

  const genres = title?.genres?.length
    ? title.genres.map((genre) => genre.name)
    : []

  const castNames = title?.credits?.cast?.length
    ? title.credits.cast.slice(0, 8).map((person) => person.name)
    : []

  const posterUrl = title?.poster_path
    ? `https://image.tmdb.org/t/p/w500${title.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image"

  const backdropUrl = title?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${title.backdrop_path}`
    : ""

  if (loading) {
    return (
      <main className="movie-details-page">
        <div className="container py-5">
          <div className="movie-details-state rounded-4 text-center p-5">
            <div className="spinner-border text-light mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h3 className="text-light fw-bold">Loading details...</h3>
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="movie-details-page">
        <div className="container py-5">
          <div className="movie-details-state rounded-4 text-center p-5">
            <h3 className="text-light fw-bold mb-3">Something went wrong</h3>
            <p className="text-light-emphasis mb-0">{error}</p>
          </div>
        </div>
      </main>
    )
  }

  if (!title) {
    return (
      <main className="movie-details-page">
        <div className="container py-5">
          <div className="movie-details-state rounded-4 text-center p-5">
            <h3 className="text-light fw-bold mb-3">No details found</h3>
            <p className="text-light-emphasis mb-0">
              We couldn’t find information for this title.
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="movie-details-page">
      <section
        className="movie-details-hero"
        style={{
          backgroundImage: backdropUrl
            ? `linear-gradient(to bottom, rgba(8,8,12,0.35), rgba(8,8,12,0.95)), url(${backdropUrl})`
            : "linear-gradient(135deg, #11111b, #1a1a2e)",
        }}
      >
        <div className="container py-4 py-md-5">
          <Link to="/" className="btn btn-outline-light mb-4">
            ← Back to Catalog
          </Link>

          <div className="row g-4 align-items-start">
            <div className="col-12 col-md-4 col-lg-3">
              <img
                src={posterUrl}
                alt={displayTitle}
                className="img-fluid rounded-4 movie-details-poster"
              />
            </div>

            <div className="col-12 col-md-8 col-lg-9">
              <div className="movie-details-panel rounded-4 p-4">
                <p className="movie-details-type text-uppercase fw-semibold mb-2">
                  {mediaType === "movie" ? "Movie" : "TV Show"}
                </p>

                <h1 className="text-light fw-bold mb-3">{displayTitle}</h1>

                <div className="d-flex flex-wrap gap-2 mb-4">
                  <span className="movie-details-meta-badge">{displayYear}</span>
                  <span className="movie-details-meta-badge">{displayRuntime}</span>
                  <span className="movie-details-meta-badge">
                    {mediaType === "movie" ? "Film" : "Series"}
                  </span>
                </div>

                {genres.length > 0 && (
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {genres.map((genre) => (
                      <span key={genre} className="movie-details-genre-badge">
                        {genre}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mb-4">
                  <h5 className="text-light fw-bold mb-2">Overview</h5>
                  <p className="text-light-emphasis mb-0">
                    {title.overview || "No overview available."}
                  </p>
                </div>

                <div>
                  <h5 className="text-light fw-bold mb-2">Cast</h5>
                  <p className="text-light-emphasis mb-0">
                    {castNames.length > 0 ? castNames.join(", ") : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default MovieDetails