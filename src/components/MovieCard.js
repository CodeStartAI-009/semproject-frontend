import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <div style={styles.card}>
      
      {/* 🎬 Poster */}
      <div style={styles.imageWrapper}>
        <img
          src={movie.poster || "https://via.placeholder.com/200x300"}
          alt={movie.title}
          style={styles.image}
        />
      </div>

      {/* 📄 Content */}
      <div style={styles.content}>
        <h3 style={styles.title}>{movie.title}</h3>

        <p style={styles.rating}>⭐ {movie.rating || "N/A"}</p>

        <Link to={`/movie/${movie._id}`} style={{ textDecoration: "none" }}>
          <button style={styles.button}>View Details</button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
     
        card: {
          minWidth: "180px",   // 👈 KEY FIX
          maxWidth: "180px",
          borderRadius: "12px",
          overflow: "hidden",
          background: "#1c1c1c",
          color: "#fff",
          boxShadow: "0 6px 15px rgba(0,0,0,0.4)",
          cursor: "pointer",
          flexShrink: 0, // 👈 prevents shrinking
        },
  imageWrapper: {
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },

  content: {
    padding: "10px",
    textAlign: "center",
  },

  title: {
    fontSize: "14px",
    marginBottom: "5px",
    minHeight: "40px",
  },

  rating: {
    marginBottom: "8px",
    color: "#f5c518",
  },

  button: {
    padding: "6px 12px",
    border: "none",
    background: "#e50914",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "12px",
  },
};

export default MovieCard;