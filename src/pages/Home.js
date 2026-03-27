import { useEffect, useState } from "react";
import API from "../services/api";
import MovieCard from "../components/MovieCard";

function Home() {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [trending, setTrending] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        // ✅ Sequential calls (prevents backend crash)
        const pop1 = await API.get("/movies?category=popular&page=1");
        const pop2 = await API.get("/movies?category=popular&page=2");
        const top = await API.get("/movies?category=top_rated&page=1");
        const trend = await API.get("/movies?category=trending&page=1");

        setPopular([...pop1.data, ...pop2.data]);
        setTopRated(top.data);
        setTrending(trend.data);

      } catch (err) {
        console.error(err);
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // 🔄 Loading
  if (loading) return <h2 style={{ textAlign: "center" }}>Loading movies...</h2>;

  // ❌ Error
  if (error) return <h2 style={{ textAlign: "center", color: "red" }}>{error}</h2>;

  return (
    <div style={styles.container}>

      <Section title="🔥 Trending Movies" movies={trending} />
      <Section title="⭐ Top Rated" movies={topRated} />
      <Section title="🎬 Popular Movies" movies={popular} />

    </div>
  );
}

/* 🔥 Reusable Section */
function Section({ title, movies }) {
  return (
    <div style={styles.section}>
      <h2 style={styles.heading}>{title}</h2>

      <div style={styles.row}>
        {movies.length === 0 ? (
          <p>No movies found</p>
        ) : (
          movies.map((m) => (
            <MovieCard key={m._id} movie={m} />
          ))
        )}
      </div>
    </div>
  );
}

/* 🎨 Styles */
const styles = {
  container: {
    padding: "20px",
    background: "#111",
    color: "#fff",
    minHeight: "100vh",
  },

  section: {
    marginBottom: "30px",
  },

  heading: {
    marginBottom: "10px",
  },

  row: {
    display: "flex",
    overflowX: "auto",
    gap: "15px",
    paddingBottom: "10px",
  },
};

export default Home;