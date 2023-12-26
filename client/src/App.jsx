import "./App.css";
import Post from "./components/Post";
import Layout from "./components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toast";
import { Link } from "react-router-dom";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllPosts = async () => {
    const { data } = await axios.get("/api/v1/blog/allblogs");

    if (data?.success) {
      setPosts(data.blogs);
    } else {
      toast.error(data?.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <Layout>
      {loading && <h2>Loading...</h2>}
      <div className="all-post">
        {posts?.map((post) => (
          <Link to={`/blog/${post?.slug}`}>
            <div key={post._id} className="post">
              <div
                style={{ display: "flex", justifyContent: "center" }}
                className="image"
              >
                <img
                  src={`/api/v1/blog/photo/${post._id}`}
                  alt="Blog Photo"
                  height="200px"
                  width="auto"
                />
              </div>
              <div className="texts">
                <h2>{post.title}</h2>
                <p className="info">
                  {/* <a href="" className="author">
                {handleAuthor(post.author)}
                </a> */}
                  <time>{post?.createdAt}</time>
                </p>
                <p className="summary">{post?.summary}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export default App;
