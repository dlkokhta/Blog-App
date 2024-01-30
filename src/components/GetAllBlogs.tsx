import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="px-14 mt-5 h-10">
      <ul className="grid grid-cols-3 gap-10">
        {blogs.map((blog) => (
          <div>
            <li key={blog._id}>
              <img
                className="h-60 w-full object-cover"
                src={`http://localhost:3000/public/storage/images/${blog.avatar}`}
                alt={blog.title}
              />
              <h2 className="font-bold">{blog.author}</h2>
              <h4>{blog.publish_date}</h4>
              <h1 className="font-bold text-3xl">{blog.title}</h1>
              <p className="">
                {blog.description.split(" ").slice(0, 20).join(" ")}
              </p>
              <p className="font-bold">{blog.categories}</p>
              <div>
                <span
                  onClick={() => navigate(`/blog/${blog.blogID}`)}
                  className="text-xs overflow-ellipsis mt-1 ml-1"
                >
                  სრულად ნახვა
                  <img src="" alt="" />
                </span>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default GetAllBlogs;
