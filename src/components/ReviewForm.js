import { useState } from "react";
import API from "../services/api";

function ReviewForm({ movieId, refresh }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReview = async () => {
    if (!text.trim()) {
      alert("Please write a review");
      return;
    }

    try {
      setLoading(true);

      await API.post("/reviews", {
        movie_id: movieId,
        rating: Number(rating), // ✅ FIX
        review_text: text,
      });

      setText("");
      setRating(5);

      refresh(); // 🔄 reload reviews

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h3>Add Review</h3>

      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        min="1"
        max="10"
        style={styles.input}
      />

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your review..."
        style={styles.textarea}
      />

      <button onClick={submitReview} disabled={loading} style={styles.button}>
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}

const styles = {
  container: {
    marginBottom: "20px",
  },
  input: {
    width: "80px",
    marginBottom: "10px",
  },
  textarea: {
    width: "100%",
    height: "80px",
    marginBottom: "10px",
  },
  button: {
    padding: "8px 12px",
    cursor: "pointer",
  },
};

export default ReviewForm;