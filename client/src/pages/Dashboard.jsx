import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { toast } from "react-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getMyPosts = async () => {
    const { user } = await JSON.parse(localStorage.getItem("auth"));
    console.log(user);
    const { data } = await axios.get(`/api/v1/blog/myblogs/${user?._id}`);

    if (data?.success) {
      setPosts(data.blogs);
    } else {
      toast.error(data?.message);
      console.log(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/deleteblog/${id}`);
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went wrong");
    }
    navigate("/dashboard");
  };

  useEffect(() => {
    getMyPosts();
  }, []);
  return (
    <Layout>
      <h1>My Blogs</h1>
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
              <button onClick={() => handleDelete(post?._id)}>
                Delete Post
              </button>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export default Dashboard;
