import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import arrow from "../assets/arrow.png";

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

const GetAllBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const url = "http://localhost:3000/api/blogs";

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(url);
        setBlogs(response.data); // Assuming the data structure returned by the backend is an array of blog objects
        // console.log("response!!!!!!", response);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);
  const navigate = useNavigate();

  const date = new Date("2024-01-31T06:35:08.888Z");
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="px-14 mt-5 h-10">
      <ul className="grid grid-cols-3 gap-10">
        {blogs.map((blog, index) => (
          <div key={index}>
            <li>
              <img
                className="h-60 w-full object-cover rounded-xl"
                src={`http://localhost:3000/public/storage/images/${blog.avatar}`}
                alt={blog.title}
              />
              <h2 className="font-bold">{blog.author}</h2>
              <h4>{formattedDate}</h4>
              <h1 className="font-bold text-3xl">{blog.title}</h1>
              <p className="">
                {blog.description.split(" ").slice(0, 20).join(" ")}
              </p>
              <p className="font-bold">{blog.categories}</p>
              <div className="flex items-center gap-1">
                <span
                  onClick={() => navigate(`/blog/${blog.blogID}`)}
                  className="text-md overflow-ellipsis mt-1 ml-1 text-purple cursor-pointer"
                >
                  see all
                </span>
                <img
                  className="w-4 h-4 "
                  style={{ transform: "rotate(-40deg)", color: "red" }}
                  src={arrow}
                  alt=""
                />
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default GetAllBlogs;
