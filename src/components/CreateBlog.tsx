import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CreateBlogSchema from "./createBlogSchema";
import axios from "axios";
import folderIcon from "../assets/folderIcon.png";
import React, { ChangeEvent } from "react";
import { useState } from "react";

interface dataForm {
  title: string;
  description: string;
  avatar: FileList;
  author: string;
  categories: string;
}

const CreateBlog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<dataForm>({ resolver: yupResolver(CreateBlogSchema) });

  const onSubmit = async (data: dataForm) => {
    console.log("dataaaa", data);

    const url = "http://localhost:3000/api/create-blog";
    const token = localStorage.getItem("authToken");

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("avatar", data.avatar[0]); // Assuming you want only the first file in the list
    formData.append("author", data.author);
    formData.append("categories", data.categories);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response!!!!!!", response);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const [author, setAuthor] = useState<string>("");
  const [isAuthorLengthValid, setIsAuthorLengthValid] = useState<
    boolean | null
  >(null);
  const [isAuthorWordsValid, setIsAuthorWordsValid] = useState<boolean | null>(
    null
  );
  const [isAuthorEnglishValid, setIsAuthorEnglishValid] = useState<
    boolean | null
  >(null);
  console.log(isAuthorLengthValid, isAuthorWordsValid, isAuthorEnglishValid);

  const authorInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAuthor(value);

    setIsAuthorLengthValid(author.length >= 4 ? true : false);
    setIsAuthorWordsValid(
      author.trim().split(/\s+/).length >= 2 ? true : false
    );
    setIsAuthorEnglishValid(/^[A-Za-z\s]*$/.test(value));
  };

  const [title, setTitle] = useState<string>("");
  const [isTitleLengthValid, setIsTitleLengthValid] = useState<boolean | null>(
    null
  );

  const titleInputChnageHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTitle(value);

    setIsTitleLengthValid(title.length >= 4 ? true : false);
  };

  const [description, setDescription] = useState<string>("");
  const [isDescriptionLengthValid, setIsDescriptionLengthValid] = useState<
    boolean | null
  >(null);

  const descriptionInputChnageHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setDescription(value);

    setIsDescriptionLengthValid(description.length >= 4 ? true : false);
  };

  return (
    // <div className="bg-white3">
    <form
      encType="multipart/form-data"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center rounded-md pt-20 px-[420px] pb-20 h-full "
    >
      <h1 className="mr-auto font-bold text-4xl pb-10">add blog</h1>
      <h4 className="mr-auto font-bold text-sm mb-1">upload photo</h4>
      <div className="w-full py-12 bg-white2 flex flex-col items-center justify-center rounded-xl border border-dashed border-2 border-grey relative mb-6">
        <img className="w-8 h-8" src={folderIcon} alt="folderIcon" />
        <i className="fas fa-folder-plus fa-2x text-blue-500 mb-2"></i>

        <label htmlFor="avatar" className="mb-2 cursor-pointer relative">
          choose file
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
            {...register("avatar")}
          />
        </label>
      </div>

      <div className="flex mb-6 gap-6 ">
        <div>
          <div>
            <label className="block font-bold text-sm pl-2" htmlFor="author ">
              Author
            </label>
            <input
              className={`rounded-xl border outline-none  h-12 w-72 pl-4 ${
                isAuthorEnglishValid === null
                  ? "border-lightGrey"
                  : isAuthorLengthValid &&
                    isAuthorWordsValid &&
                    isAuthorEnglishValid
                  ? "border-green1 bg-lightGreen"
                  : "border-red-500 bg-lightRed"
              }`}
              placeholder="enter athor"
              type="text"
              id="author"
              {...register("author", { onChange: authorInputChangeHandler })}
            />
            {errors.author ? <p>{errors.author.message}</p> : null}
          </div>

          <div>
            <ul className="list-disc pl-4 text-grey pl-4">
              <li
                className={
                  isAuthorLengthValid === null
                    ? "text-grey"
                    : isAuthorLengthValid
                    ? "text-green1"
                    : "text-red-500"
                }
              >
                minimum 4 symbols
              </li>
              <li
                className={
                  isAuthorWordsValid === null
                    ? "text-grey"
                    : isAuthorWordsValid
                    ? "text-green1"
                    : "text-red-500"
                }
              >
                minimum two words
              </li>
              <li
                className={
                  isAuthorEnglishValid === null
                    ? "text-grey"
                    : isAuthorEnglishValid
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
                  isTitleLengthValid === null
                    ? "border-lightGrey"
                    : isTitleLengthValid
                    ? "border-green1 bg-lightGreen"
                    : "border-red-500 bg-lightRed"
                } `}
                placeholder="enter title"
                type="text"
                id="title"
                {...register("title", { onChange: titleInputChnageHandler })}
              />
              {errors.title ? <p>{errors.title.message}</p> : null}
            </div>
            <ul className="list-disc text-grey pl-4">
              <li
                className={
                  isTitleLengthValid === null
                    ? "text-grey"
                    : isTitleLengthValid
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
            isDescriptionLengthValid === null
              ? "border-lightGrey"
              : isDescriptionLengthValid
              ? "border-green1 bg-lightGreen"
              : "border-red-500 bg-lightRed"
          }`}
          id="description"
          {...register("description", {
            onChange: descriptionInputChnageHandler,
          })}
        />
        <ul className="list-disc text-grey pl-4">
          <li
            className={
              isDescriptionLengthValid === null
                ? "text-grey"
                : isDescriptionLengthValid
                ? "text-green1"
                : "text-red-500"
            }
          >
            minimum 4 symbols
          </li>
        </ul>
        {errors.description ? <p>{errors.description.message}</p> : null}
      </div>
      <div className="mb-4 mr-auto mb-10">
        <label className="block font-bold text-sm mb-2" htmlFor="categories">
          category
        </label>
        <select
          className="rounded pl-2 py-2 rounded-md"
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
          <option value="UI/UX">UI/UX</option>
          <option value="research">Research</option>
          <option value="figma">Figma</option>
        </select>
      </div>

      <div className="ml-auto">
        <button
          className={`rounded-md text-2xl px-28 py-2 text-white ${
            isAuthorLengthValid &&
            isAuthorWordsValid &&
            isAuthorEnglishValid &&
            isTitleLengthValid &&
            isDescriptionLengthValid
              ? "bg-green1"
              : "bg-lightGray"
          }`}
          type="submit"
        >
          publish
        </button>
      </div>
    </form>
    // </div>
  );
};

export default CreateBlog;
