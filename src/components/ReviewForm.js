import { useState } from "react";
import API from "../services/api";

function ReviewForm({ movieId, refresh }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  const submitReview = async () => {
    try {
      await API.post("/reviews", {
        movie_id: movieId,
        rating,
        review_text: text,
      });
  
      setText("");
      refresh();
  
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to submit review");
    }
  };

  return (
    <div>
      <h3>Add Review</h3>
      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        min="1"
        max="5"
      />
      <br />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write review..."
      />
      <br />
      <button onClick={submitReview}>Submit</button>
    </div>
  );
}

export default ReviewForm;