import React, { useState } from "react";
import Layout from "../components/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { toast } from "react-toast";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/v1/auth/login`, {
        email,
        password,
      });
      if (data && data.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }

      setAuth({
        ...auth,
        user: data?.user,
        token: data?.token,
      });
      localStorage.setItem("auth", JSON.stringify(data));
      navigate(location.state || "/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="login">
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </Layout>
  );
}

export default Login;
