import { useEffect, useMemo, useState } from "react"
import { getLatestLgbtTitles } from "../services/tmdb"
import SectionHeader from "../components/home/SectionHeader"
import MoviesGrid from "../components/home/MoviesGrid"
import HomeState from "../components/home/HomeState"
import "../styles/home.css"

function Home() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchMovies() {
      try {
        const data = await getLatestLgbtTitles()
        setMovies(data)
      } catch (err) {
        console.error("HOME ERROR:", err)
        setError(err.message || "Could not load movies.")
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  if (error) {
    return (
      <HomeState
        title="Something went wrong"
        message={error}
        variant="error"
      />
    )
  }

  if (movies.length === 0) {
    return (
      <HomeState
        title="No titles found"
        message="We couldn’t find any LGBT titles right now."
        variant="empty"
      />
    )
  }

  return (
    <main className="home-page">
      <div className="container py-4 py-md-5">

        <SectionHeader
          eyebrow="Fresh picks"
          title="Latest LGBT Titles"
          description="A curated collection of recent queer stories worth exploring."
          count={movies.length}
        />

        <MoviesGrid movies={movies} />
      </div>
    </main>
  )
}

export default Home