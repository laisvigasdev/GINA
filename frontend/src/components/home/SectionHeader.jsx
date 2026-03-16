function SectionHeader({ eyebrow, title, description, count }) {
  return (
    <section className="mb-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3">
        <div>
          <p className="home-eyebrow text-uppercase small fw-semibold mb-2">
            {eyebrow}
          </p>
          <h2 className="fw-bold mb-1 text-light">{title}</h2>
          <p className="text-light-emphasis mb-0">{description}</p>
        </div>
      </div>
    </section>
  )
}

export default SectionHeader