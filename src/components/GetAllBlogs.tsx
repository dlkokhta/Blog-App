import axios from "axios";
import { useEffect, useState } from "react";

interface Blog {
  _id: string;
  title: string;
  description: string;
  author: string;
  publish_date: string;
  categories: string[];
  avatar: string;
}

const GetAllBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const url = "http://localhost:3000/api/blogs";

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(url);
        setBlogs(response.data); // Assuming the data structure returned by the backend is an array of blog objects
        console.log("response!!!!!!", response);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <ul className="flex gap-8">
        {blogs.map((blog) => (
          <li key={blog._id}>
            <h3 className="text-red-500">{blog.title}</h3>
            <p>{blog.description}</p>
            <p>{blog.author}</p>
            <p>{blog.publish_date}</p>
            <p>{blog.categories}</p>
            <img
              src={`http://localhost:3000/public/storage/images/${blog.avatar}`}
              alt={blog.title}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllBlogs;
