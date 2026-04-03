import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import ReviewForm from "../components/ReviewForm";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ FIX: useCallback
  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const [movieRes, reviewRes, summaryRes] = await Promise.all([
        API.get(`/movies/${id}`),
        API.get(`/reviews/${id}`),
        API.get(`/reviews/summary/${id}`),
      ]);

      setMovie(movieRes.data);
      setReviews(reviewRes.data);
      setSummary(summaryRes.data);

    } catch (err) {
      console.error(err);
      setError("Failed to load movie data");
    } finally {
      setLoading(false);
    }
  }, [id]);

  // ✅ FIX: only depend on loadData
  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (error) return <h2 style={{ textAlign: "center", color: "red" }}>{error}</h2>;

  return (
    <div style={styles.container}>

      {/* 🎬 Movie */}
      <h2>{movie?.title}</h2>

      <div style={styles.movieSection}>
        {movie?.poster && (
          <img src={movie.poster} alt={movie.title} style={styles.poster} />
        )}

        <div>
          <p><b>⭐ TMDB Rating:</b> {movie?.rating || "N/A"}</p>
          <p><b>📅 Release:</b> {movie?.release_date || "N/A"}</p>

          <p>
            <b>🎭 Genres:</b>{" "}
            {movie?.genres?.length > 0 ? movie.genres.join(", ") : "N/A"}
          </p>

          <p><b>📖 Description:</b> {movie?.description}</p>
        </div>
      </div>

      {/* 📊 AI Summary */}
      {summary && (
        <div style={styles.summary}>
          <h3>📊 AI Review Analysis</h3>

          <p>👍 Positive: {summary.positive}%</p>
          <p>👎 Negative: {summary.negative}%</p>
          <p>😐 Neutral: {summary.neutral}%</p>

          <p>⚠️ Fake Reviews: {summary.fake_percentage}%</p>

          <p>⭐ Overall Rating: {summary.overall_rating}/10</p>

          <p><b>{summary.summary}</b></p>
        </div>
      )}

      {/* ⭐ Add Review */}
      <ReviewForm movieId={id} refresh={loadData} />

      {/* 💬 Reviews */}
      <h3>Reviews</h3>

      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews.map((r, index) => (
          <div
            key={index}
            style={{
              ...styles.reviewCard,
              background:
                r.sentiment === "positive"
                  ? "#e8f5e9"
                  : r.sentiment === "negative"
                  ? "#ffebee"
                  : "#eeeeee",
            }}
          >
            <p><b>User:</b> {r.user_id}</p>

            <p>
              <b>Source:</b>{" "}
              {r.source === "tmdb" ? "🌍 Online" : "🧑 User"}
            </p>

            <p>⭐ {r.rating || "N/A"}</p>

            <p>{r.review_text}</p>

            <p>
              📊{" "}
              <b
                style={{
                  color:
                    r.sentiment === "positive"
                      ? "green"
                      : r.sentiment === "negative"
                      ? "red"
                      : "gray",
                }}
              >
                {r.sentiment}
              </b>
            </p>

            <p style={styles.time}>{r.created_at}</p>
          </div>
        ))
      )}
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
  movieSection: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },
  poster: {
    width: "200px",
    borderRadius: "10px",
  },
  summary: {
    border: "1px solid #444",
    padding: "15px",
    marginBottom: "20px",
    borderRadius: "8px",
    background: "#1c1c1c",
  },
  reviewCard: {
    border: "1px solid #333",
    margin: "10px 0",
    padding: "10px",
    borderRadius: "8px",
    color: "#000",
  },
  time: {
    fontSize: "12px",
    color: "gray",
  },
};

export default MovieDetails;