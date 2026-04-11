import { useState } from "react";
import API from "../services/api";

function Register() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const register = async () => {
    try {
      await API.post("/auth/register", data);
      alert("Registered successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Register</h2>

        <input
          style={styles.input}
          placeholder="Username"
          onChange={(e) =>
            setData({ ...data, username: e.target.value })
          }
        />

        <input
          style={styles.input}
          placeholder="Email"
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        <button style={styles.button} onClick={register}>
          Register
        </button>
      </div>
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
  },

  card: {
    background: "#1e293b",
    padding: "30px",
    borderRadius: "12px",
    width: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
  },

  title: {
    textAlign: "center",
    color: "#fff",
    marginBottom: "10px",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #334155",
    background: "#0f172a",
    color: "#fff",
    outline: "none",
  },

  button: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#22c55e",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default Register;