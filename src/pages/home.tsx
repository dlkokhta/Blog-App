import Main from "../components/Main";
import GetAllBlogs from "../components/GetAllBlogs";
import BlogCategories from "../components/blogCategories";

const home = () => {
  return (
    <div>
      <Main />
      <BlogCategories />
      <GetAllBlogs />
    </div>
  );
};

export default home;
