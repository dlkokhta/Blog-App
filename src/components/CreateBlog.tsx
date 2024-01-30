import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CreateBlogSchema from "./createBlogSchema";
import axios from "axios";

interface CreateBlogProps {
  backgroundClick: boolean;
  toggleRegistration: (value: boolean) => void;
}

interface dataForm {
  title: string;
  description: string;
  avatar: string;
  author: string;
  categories: string;
}

const CreateBlog: React.FC<CreateBlogProps> = ({
  backgroundClick,
  toggleRegistration,
}) => {
  const backgroundClickhandler = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("clicked");
    toggleRegistration(!backgroundClick);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<dataForm>({ resolver: yupResolver(CreateBlogSchema) });

  const onSubmit = async (data: dataForm) => {
    console.log(data);
    // Perform any additional logic or API calls here

    const url = "http://localhost:3000/api/create-blog";

    const token = localStorage.getItem("authToken");
    // console.log("token from localstorage", token);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("avatar", data.avatar[0]); // Assuming only one file is selected
    formData.append("author", data.author);
    formData.append("categories", data.categories);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Make sure to set this header
        },
      });
      console.log("response!!!!!!", response);
      // reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={backgroundClickhandler}
      className="top-0 left-0 right-0 w-full h-full pt-[120px] absolute bg-[#181818] bg-opacity-30 "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col items-center bg-red-500 mx-[800px]"
      >
        <form
          encType="multipart/form-data"
          onSubmit={onSubmit}
          // onSubmit={handleSubmit(onSubmit)}
          className="p-6 bg white bg-white2 rounded-md bg-green "
        >
          <div className="mb-4">
            <label className="block" htmlFor="title">
              title
            </label>
            <input
              className="rounded"
              type="text"
              id="title"
              // {...register("title")}
            />
            {/* {errors.title ? <p>{errors.title.message}</p> : null} */}
          </div>

          <div className="mb-4">
            <label className="block" htmlFor="description">
              description
            </label>
            <input
              className="rounded"
              type="text"
              id="description"
              // {...register("description")}
            />
            {/* {errors.description ? <p>{errors.description.message}</p> : null} */}
          </div>

          <div className="mb-4">
            <label className="block" htmlFor="avatar">
              avatar
            </label>
            <input
              className="rounded"
              type="file"
              id="avatar"
              // {...register("avatar")}
            />
            {/* {errors.avatar ? <p>{errors.avatar.message}</p> : null} */}
          </div>

          <div className="mb-4">
            <label className="block" htmlFor="author">
              author
            </label>
            <input
              className="rounded pl-2"
              type="text"
              id="author"
              // {...register("author")}
            />
            {/* {errors.author ? <p>{errors.author.message}</p> : null} */}
          </div>

          <div className="mb-4">
            <label className="block" htmlFor="categories">
              categories
            </label>
            <input
              className="rounded pl-2"
              type="text"
              id="categories"
              // {...register("categories")}
            />
            {/* {errors.categories ? <p>{errors.categories.message}</p> : null} */}
          </div>

          <div className="text-center">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
