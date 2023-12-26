import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

function Header() {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successful!");
  };

  return (
    <div>
      <header>
        <Link to="/" className="logo">
          Blog
        </Link>
        <nav>
          {auth?.user ? (
            <>
              <Link to="/createBlog">Write</Link>
              <Link to="/dashboard">{auth?.user?.username}</Link>
              <Link to="/login" onClick={handleLogout}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
}

export default Header;
