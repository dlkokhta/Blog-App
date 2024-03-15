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
  email: string;
}

const BlogByID = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [similarBlogs, setSimilarBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogByCategory = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/blogs");
        console.log("response!!!!!!", response);
        setSimilarBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogByCategory();
  }, [id]);

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

  const date = new Date("2024-01-31T06:35:08.888Z");
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <>
      <div className="flex flex-col items-center px-[350px] mt-20 mb-20">
        <img
          className="mb-10 rounded-xl"
          src={`http://localhost:3000/public/storage/images/${blog.avatar}`}
          alt={blog.avatar}
        />
        <p className="font-bold text-xl mr-auto">{blog.author}</p>
        <div className="flex gap-2 mr-auto text-grey2">
          <p>{formattedDate}</p>
          <div>{blog.email}</div>
        </div>
        <h1 className="font-bold text-3xl mb-5">{blog.title}</h1>
        <p>{blog.categories}</p>
        <p>{blog.description}</p>
      </div>

      <div className="px-14 mt-5 h-10">
        <h1 className="font-bold text-3xl mb-10">Similar articles</h1>

        <ul className="grid grid-cols-3 gap-10">
          {similarBlogs
            .filter((similar) => similar.categories === blog.categories)
            .filter(
              (blog, index, self) =>
                index ===
                self.findIndex((t) => t.categories === blog.categories)
            )
            .map((blog, index) => (
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
                  {/* <div className="flex items-center gap-1">
                  <span
                    // onClick={() => navigate(`/blog/${blog.blogID}`)}
                    className="text-md overflow-ellipsis mt-1 ml-1 text-purple cursor-pointer"
                  >
                    სრულად ნახვა
                  </span>
                  <img
                    className="w-4 h-4 "
                    style={{ transform: "rotate(-40deg)", color: "red" }}
                    src={arrow}
                    alt=""
                  />
                </div> */}
                </li>
              </div>
            ))}
        </ul>
      </div>
    </>
  );
};

export default BlogByID;
