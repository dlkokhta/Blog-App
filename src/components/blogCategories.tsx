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
  blogID: string;
}

const bgColors = [
  "rgba(255, 184, 47, 0.08)",
  "rgba(28, 214, 125, 0.08)",
  "rgba(177, 28, 214, 0.08)",
  "rgba(250, 87, 87, 0.08)",
  "rgba(112, 207, 37, 0.08)",
  "rgba(8, 210, 174, 0.08)",
];

const textColors = [
  "#D6961C",
  "#15C972",
  "#B71FDD",
  "#DC2828",
  "#60BE16",
  "#1AC7A8",
];

const url = "http://localhost:3000/api/blogs";

const BlogCategories = () => {
  const [blogsByCategory, setBlogsByCategory] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogsByCategory = async () => {
      try {
        const response = await axios.get(url);

        setBlogsByCategory(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogsByCategory();
  }, []);

  return (
    <div className="pb-8">
      <ul className="flex flex-row justify-center gap-6 ">
        {blogsByCategory

          .filter(
            (blog, index, self) =>
              index === self.findIndex((t) => t.categories === blog.categories)
          )
          .map((blog, index) => (
            <li
              key={index}
              className="rounded-full px-6 py-1 text-white font-bold"
              style={{
                backgroundColor: bgColors[index % bgColors.length],
                color: textColors[index % textColors.length],
              }}
            >
              <div>{blog.categories}</div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BlogCategories;
