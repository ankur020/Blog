import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import { toast } from "react-toast";
import Layout from "./Layout";

function Post() {
  const params = useParams();
  const [post, setPost] = useState({});

  //get single blog
  const getBlog = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/blog/singleBlog/${params.slug}`
      );

      if (data?.success) {
        setPost(data?.blog);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const convertHtmlToPlainText = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  useEffect(() => {
    getBlog();
  }, []);
  return (
    <Layout>
      <div className="single-post">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="image"
        >
          <h1>{post?.title}</h1>
          <img
            src={`http://localhost:8080/api/v1/blog/photo/${post?._id}`}
            alt="Blog Photo"
          />
        </div>
        <div className="texts">
          <h1>{post?.title}</h1>
          <p className="info">
            {/* <a href="" className="author">
                {handleAuthor(post.author)}
              </a> */}
            <time>{post?.createdAt}</time>
          </p>
          <p className="single-summary">{post?.summary}</p>
          <div dangerouslySetInnerHTML={{ __html: post?.content }} />
        </div>
      </div>
    </Layout>
  );
}

export default Post;
