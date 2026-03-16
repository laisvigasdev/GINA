function HeroSection({ featuredMovie }) {
  const backgroundImage = featuredMovie?.backdrop_path
    ? `linear-gradient(90deg, rgba(5,5,10,0.92) 0%, rgba(5,5,10,0.70) 45%, rgba(5,5,10,0.35) 100%), url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})`
    : "linear-gradient(135deg, #ff006e, #8338ec, #3a86ff)"

  const title = featuredMovie?.title || featuredMovie?.name || "Stories that shine beyond the screen"

  const overview = featuredMovie?.overview
    ? featuredMovie.overview.length > 180
      ? `${featuredMovie.overview.slice(0, 180)}...`
      : featuredMovie.overview
    : "Discover powerful LGBT films and series — romantic, rebellious, heartfelt, intimate, and unforgettable."

  return (
    <section
      className="home-hero rounded-4 overflow-hidden mb-5"
      style={{ backgroundImage }}
    >
      <div className="home-hero__content p-4 p-md-5">
        <span className="home-badge badge rounded-pill px-3 py-2 mb-3">
          QUEER CINEMA SPOTLIGHT
        </span>

        <h1 className="display-4 fw-bold mb-3 home-hero__title">
          Stories that shine beyond the screen
        </h1>

        <p className="lead text-light-emphasis mb-4 home-hero__subtitle">
          Discover powerful LGBT films and series — romantic, rebellious,
          heartfelt, intimate, and unforgettable.
        </p>

        <div className="d-flex flex-wrap gap-2 mb-4">
          <span className="badge rounded-pill text-bg-light px-3 py-2">
            Latest releases
          </span>
          <span className="badge rounded-pill home-chip px-3 py-2">
            Queer stories
          </span>
          <span className="badge rounded-pill home-chip px-3 py-2">
            Movies & TV
          </span>
        </div>

        <div className="home-featured-card rounded-4 p-3 p-md-4">
          <p className="text-uppercase small text-light-emphasis mb-2 fw-semibold">
            Featured title
          </p>
          <h2 className="fw-bold mb-2">{title}</h2>
          <p className="text-light-emphasis mb-0">{overview}</p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection