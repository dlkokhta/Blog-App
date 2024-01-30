import { useState } from "react";
import CreateBlog from "./CreateBlog";
const UserPage = () => {
  const [isCreateBlogOpen, setIsCreateBlogOpen] = useState(false);
  const crateBlogClickhandler = () => {
    console.log("clicked");
    setIsCreateBlogOpen(!isCreateBlogOpen);
  };
  return (
    <div className="text-center mt-40">
      <button
        className="bg-green rounded-xl px-10 py-3 text-white hover:bg-blue " 
        onClick={crateBlogClickhandler}
      >
        Create Blog
      </button>
      {isCreateBlogOpen && (
        <CreateBlog
          backgroundClick={isCreateBlogOpen}
          toggleRegistration={setIsCreateBlogOpen}
        />
      )}
    </div>
  );
};

export default UserPage;
