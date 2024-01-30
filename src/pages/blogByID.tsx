import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Blog {
  _id: string;
  title: string;
  description: string;
  author: string;
  publish_date: string;
  categories: string[];
  avatar: string;
  blogID: string;
}

const BlogByID = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlogByID = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/blogs/${id}`
        );
        setBlog(response.data);
        console.log("response blog by id", response);
      } catch (error) {
        console.error("Error fetching blog by ID:", error);
      }
    };

    fetchBlogByID();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-4">
      <img
        src={`http://localhost:3000/public/storage/images/${blog.avatar}`}
        alt={blog.title}
      />
      <h1 className="text-red-500">{blog.title}</h1>
      <p>{blog.description}</p>
      {/* <p>{blog.author}</p> */}
      {/* <p>{blog.publish_date}</p> */}
      <p>{blog.categories}</p>
    </div>
  );
};

export default BlogByID;
