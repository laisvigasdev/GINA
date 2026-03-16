function HomeState({ title, message, variant }) {
  return (
    <div className="home-page">
      <div className="container py-5">
        <div className={`home-state home-state--${variant} rounded-4 p-5 text-center`}>
          {variant === "loading" && (
            <div className="spinner-border mb-3 text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}

          <h3 className="fw-bold mb-3 text-light">{title}</h3>
          <p className="text-light-emphasis mb-0">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default HomeState