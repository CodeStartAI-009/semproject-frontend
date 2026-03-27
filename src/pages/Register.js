import { useState } from "react";
import API from "../services/api";

function Register() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const register = async () => {
    await API.post("/register", data);
    alert("Registered!");
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Username" onChange={(e) => setData({ ...data, username: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setData({ ...data, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setData({ ...data, password: e.target.value })} />
      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;