import { uniqueKeywords } from "../data/keywords"

const BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

async function fetchFromTMDB(endpoint) {
  const separator = endpoint.includes("?") ? "&" : "?"
  const url = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.status_message || "Failed to fetch from TMDB")
  }

  return data
}

export async function getMovieById(id) {
  return fetchFromTMDB(`/movie/${id}?append_to_response=credits`)
}

export async function getTvById(id) {
  return fetchFromTMDB(`/tv/${id}?append_to_response=credits`)
}

export async function getTitleDetails(id, mediaType) {
  return mediaType === "tv" ? getTvById(id) : getMovieById(id)
}

export async function searchKeywordByName(name) {
  return fetchFromTMDB(`/search/keyword?query=${encodeURIComponent(name)}`)
}

async function getKeywordIds(keywordNames) {
  const keywordResponses = await Promise.all(
    keywordNames.map((name) => searchKeywordByName(name))
  )

  return [
    ...new Set(
      keywordResponses
        .flatMap((response) => response.results || [])
        .map((keyword) => keyword.id)
    ),
  ]
}

export async function getLatestLgbtTitles() {
  const keywordIds = await getKeywordIds(uniqueKeywords)

  if (keywordIds.length === 0) {
    return []
  }

  const today = new Date().toISOString().split("T")[0]
  const keywordQuery = keywordIds.join("|")

  const [movieData, tvData] = await Promise.all([
    fetchFromTMDB(
      `/discover/movie?with_keywords=${keywordQuery}&include_adult=false&primary_release_date.lte=${today}&sort_by=primary_release_date.desc&without_genres=99,10402&page=1`
    ),
    fetchFromTMDB(
      `/discover/tv?with_keywords=${keywordQuery}&include_adult=false&first_air_date.lte=${today}&sort_by=first_air_date.desc&without_genres=10764,10767,10763&page=1`
    ),
  ])

  const movies = (movieData.results || []).map((item) => ({
    ...item,
    media_type: "movie",
    displayTitle: item.title || item.original_title || "Unknown title",
    displayDate: item.release_date || "",
  }))

  const tvShows = (tvData.results || []).map((item) => ({
    ...item,
    media_type: "tv",
    displayTitle: item.name || item.original_name || "Unknown title",
    displayDate: item.first_air_date || "",
  }))

  return [...movies, ...tvShows]
    .filter((item) => item.displayDate)
    .filter((item) => item.poster_path)
    .sort(
      (a, b) =>
        new Date(b.displayDate).getTime() -
        new Date(a.displayDate).getTime()
    )
    .slice(0, 10)
}