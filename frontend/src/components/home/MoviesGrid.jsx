import MovieCard from "../MovieCard"

function MoviesGrid({ movies }) {
  return (
    <section>
      <div className="row g-4">
        {movies.map((movie) => (
          <div
            key={`${movie.media_type}-${movie.id}`}
            className="col-12 col-sm-6 col-lg-4 col-xl-3"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default MoviesGrid