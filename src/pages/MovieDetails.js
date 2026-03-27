import { useEffect, useState } from "react";
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

  const loadData = async () => {
    try {
      setLoading(true);

      const movieRes = await API.get(`/movies/${id}`);
      const reviewRes = await API.get(`/reviews/${id}`);
      const summaryRes = await API.get(`/reviews/summary/${id}`);

      setMovie(movieRes.data);
      setReviews(reviewRes.data);
      setSummary(summaryRes.data);

    } catch (err) {
      console.error("Error:", err);
      setError("Failed to load movie data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (error) return <h2 style={{ textAlign: "center", color: "red" }}>{error}</h2>;

  return (
    <div style={{ padding: "20px" }}>
      
      {/* 🎬 Movie Section */}
      <h2>{movie.title}</h2>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        
        {/* Poster */}
        {movie.poster && (
          <img src={movie.poster} alt={movie.title} width="200" />
        )}

        <div>
          <p><b>⭐ Rating:</b> {movie.rating || "N/A"}</p>
          <p><b>📅 Release:</b> {movie.release_date || "N/A"}</p>

          <p>
            <b>🎭 Genres:</b>{" "}
            {movie.genres?.length > 0
              ? movie.genres.join(", ")
              : "N/A"}
          </p>

          <p><b>📖 Description:</b> {movie.description}</p>
        </div>
      </div>

      {/* 📊 AI Summary */}
      {summary && (
        <div
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "8px",
            background: "#f9f9f9"
          }}
        >
          <h3>📊 Review Summary</h3>
          <p>👍 Positive: {summary.positive}%</p>
          <p>👎 Negative: {summary.negative}%</p>
          <p><b>{summary.summary}</b></p>
        </div>
      )}

      {/* ⭐ Review Form */}
      <ReviewForm movieId={id} refresh={loadData} />

      {/* 💬 Reviews */}
      <h3>Reviews</h3>

      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews.map((r) => (
          <div
            key={r._id}
            style={{
              border: "1px solid #ccc",
              margin: "10px 0",
              padding: "10px",
              borderRadius: "8px",
              background: r.sentiment === "positive" ? "#e8f5e9" : "#ffebee"
            }}
          >
            {/* 👤 User */}
            <p><b>User:</b> {r.user_id}</p>

            {/* ⭐ Rating */}
            <p>⭐ {r.rating}</p>

            {/* 💬 Review */}
            <p>{r.review_text}</p>

            {/* 📊 Sentiment */}
            <p>
              📊{" "}
              <b style={{ color: r.sentiment === "positive" ? "green" : "red" }}>
                {r.sentiment}
              </b>
            </p>

            {/* 🕒 Time */}
            <p style={{ fontSize: "12px", color: "gray" }}>
              {r.created_at}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default MovieDetails;