import { Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import MovieDetails from "./pages/MovieDetails"
import "./styles/app.css"

function App() {
  return (
    <div className="app-shell">
      <nav className="app-navbar navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand app-navbar__brand" to="/">
            GINA
          </Link>

          <div className="navbar-nav ms-auto">
            <Link className="nav-link app-navbar__link" to="/">
              Home
            </Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:mediaType/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  )
}

export default App