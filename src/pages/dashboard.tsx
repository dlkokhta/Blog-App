import CreateBlog from "../components/CreateBlog";
import { useState } from "react";

const dashboard = () => {
  const [isCreateBlogOpen, setIsCreateBlogOpen] = useState(false);
  return (
    <div>
      <CreateBlog
        backgroundClick={isCreateBlogOpen}
        toggleRegistration={setIsCreateBlogOpen}
      />
    </div>
  );
};

export default dashboard;
