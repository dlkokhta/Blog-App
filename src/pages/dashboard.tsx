import CreateBlog from "../components/CreateBlog";
import { useState } from "react";

const dashboard = () => {
  const [isCreateBlogOpen, setIsCreateBlogOpen] = useState(false);
  return (
    <>
      <CreateBlog
        backgroundClick={isCreateBlogOpen}
        toggleRegistration={setIsCreateBlogOpen}
      />
    </>
  );
};

export default dashboard;
