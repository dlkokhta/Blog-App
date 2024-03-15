import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CreateBlogSchema from "./createBlogSchema";
import axios from "axios";
import folderIcon from "../assets/folderIcon.png";
import { useState } from "react";

interface dataForm {
  title: string;
  description: string;
  avatar: string;
  author: string;
  categories: string;
}

const CreateBlog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    trigger,
  } = useForm<any>({ resolver: yupResolver(CreateBlogSchema) });

  const title = watch("title");
  const description = watch("description");
  const author = watch("author");
  const categories = watch("categories");
  // const handleFileReset = () => {
  //   setSelectedFile(null);
  // };
  const onSubmit = async (data: dataForm) => {
    console.log("dataaaa", data);

    const url = "http://localhost:3000/api/create-blog";
    const token = localStorage.getItem("authToken");

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("avatar", data.avatar[0]);
    formData.append("author", data.author);
    formData.append("categories", data.categories);

    try {
      await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setSelectedFile(null);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  console.log(selectedFile, "selectedFile");
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file);
  };

  return (
    <form
      encType="multipart/form-data"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center rounded-md pt-20 px-[420px] pb-20 h-full "
    >
      <h1 className="mr-auto font-bold text-4xl pb-10">add blog</h1>
      <h4 className="mr-auto font-bold text-sm mb-1">upload photo</h4>
      <div className="w-full py-12 bg-white2 flex flex-col items-center justify-center rounded-xl border border-dashed border-grey relative mb-6">
        <img className="w-8 h-8" src={folderIcon} alt="folderIcon" />
        <i className="fas fa-folder-plus fa-2x text-blue-500 mb-2"></i>

        <label htmlFor="avatar" className="mb-2 cursor-pointer relative">
          Choose file
          <input
            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
            style={{
              top: "auto",
              bottom: "auto",
              left: "auto",
              right: "auto",
            }}
            type="file"
            id="avatar"
            {...register("avatar", { onChange: handleFileChange })}
          />
        </label>

        {selectedFile && (
          <div className="text-sm mt-2">
            <p>
              File Name: <strong>{selectedFile.name}</strong>
            </p>
          </div>
        )}
      </div>

      <div className="flex mb-6 gap-6 ">
        <div>
          <div>
            <label className="block font-bold text-sm pl-2" htmlFor="author ">
              Author
            </label>
            <input
              className={`rounded-xl border outline-none  h-12 w-72 pl-4 ${
                author === undefined || author === ""
                  ? "border-lightGrey"
                  : author &&
                    author.length >= 4 &&
                    author.trim().split(/\s+/).length >= 2 &&
                    /^[A-Za-z\s]*$/.test(author)
                  ? "border-green1 bg-lightGreen"
                  : "border-red-500 bg-lightRed"
              }`}
              placeholder="enter athor"
              type="text"
              id="author"
              {...register("author")}
            />
            {errors.author ? <p>{errors.author.message}</p> : null}
          </div>

          <div>
            <ul className="list-disc pl-4 text-grey">
              <li
                className={
                  author === undefined || author === ""
                    ? "text-grey"
                    : author && author.length >= 4
                    ? "text-green1"
                    : "text-red-500"
                }
              >
                minimum 4 symbols
              </li>
              <li
                className={
                  author === undefined ||
                  author === "" ||
                  (author &&
                    author.trim().split(/\s+/).length >= 2 === undefined)
                    ? "text-grey"
                    : author && author.trim().split(/\s+/).length >= 2
                    ? "text-green1"
                    : "text-red-500"
                }
              >
                minimum two words
              </li>
              <li
                className={
                  author === undefined ||
                  author === "" ||
                  (author && /^[A-Za-z\s]*$/.test(author) === null)
                    ? "text-grey"
                    : /^[A-Za-z\s]*$/.test(author)
                    ? "text-green1"
                    : "text-red-500"
                }
              >
                only English symbols
              </li>
            </ul>
          </div>
        </div>

        <div>
          <div>
            <div className=" ml-auto">
              <label className="block font-bold text-sm pl-2" htmlFor="title">
                Title
              </label>
              <input
                className={`rounded-xl border outline-none  h-12 w-72  pl-4 ${
                  title === undefined || title === ""
                    ? "border-lightGrey"
                    : title && title.length >= 4
                    ? "border-green1 bg-lightGreen"
                    : "border-red-500 bg-lightRed"
                } `}
                placeholder="enter title"
                type="text"
                id="title"
                {...register("title")}
              />
              {errors.title ? <p>{errors.title.message}</p> : null}
            </div>
            <ul className="list-disc text-grey pl-4">
              <li
                className={
                  title === undefined || title === ""
                    ? "text-grey"
                    : title && title.length >= 4
                    ? "text-green1"
                    : "text-red-500"
                }
              >
                minimum 4 symbols
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-4 w-full ">
        <label className="block font-bold text-sm" htmlFor="description">
          Description
        </label>
        <textarea
          className={`rounded-md border w-full h-32 outline-none ${
            description === "" || description === undefined
              ? "border-lightGrey"
              : description && description.length >= 4
              ? "border-green1 bg-lightGreen"
              : "border-red-500 bg-lightRed"
          }`}
          id="description"
          {...register("description")}
          // {...register("description", {
          //   onChange: descriptionInputChnageHandler,
          // })}
        />
        <ul className="list-disc text-grey pl-4">
          <li
            className={
              description === "" || description === undefined
                ? "text-grey"
                : description && description.length >= 4
                ? "text-green1"
                : "text-red-500"
            }
          >
            minimum 4 symbols
          </li>
        </ul>
        {errors.description ? <p>{errors.description.message}</p> : null}
      </div>
      <div className="mb-4 mr-auto md:mb-10">
        <label className="block font-bold text-sm mb-2" htmlFor="categories">
          category
        </label>
        <select
          className="rounded pl-2 py-2"
          id="categories"
          {...register("categories")}
          defaultValue=""
        >
          <option style={{ color: "lightGray" }} value="" disabled>
            Choose category
          </option>
          <option value="market">Market</option>
          <option value="application">Application</option>
          <option value="Artificial intelligence">
            Artificial Intelligence
          </option>
          <option value="sport">sport</option>
          <option value="research">Research</option>
          <option value="figma">Figma</option>
        </select>
      </div>

      <div className="ml-auto">
        <button
          className={`rounded-md text-2xl px-28 py-2 text-white ${
            author &&
            categories &&
            author.length >= 4 &&
            author.trim().split(/\s+/).length >= 2 &&
            /^[A-Za-z\s]*$/.test(author) &&
            description
              ? "bg-green1"
              : "bg-lightGray"
          }`}
          type="submit"
        >
          publish
        </button>
      </div>
    </form>
  );
};

export default CreateBlog;
