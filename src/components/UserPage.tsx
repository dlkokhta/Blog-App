import { useState } from "react";
import CreateBlog from "./CreateBlog";
const UserPage = () => {
  const [isCreateBlogOpen, setIsCreateBlogOpen] = useState(false);
  const crateBlogClickhandler = () => {
    console.log("clicked");
    setIsCreateBlogOpen(!isCreateBlogOpen);
  };
  return (
    <div>
      <button onClick={crateBlogClickhandler}>Create Blog</button>
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
