import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "./loginSchema";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface RegistrationProps {
  isLoginOpen: boolean;
  setIsLoginOpen: (value: boolean) => void;
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: (value: boolean) => void;

  setIsVerifyOpen: (value: boolean) => void;
}

interface dataForm {
  email: string;
  password: string;
}

const Login: React.FC<RegistrationProps> = ({
  isLoginOpen,
  setIsLoginOpen,
  isUserLoggedIn,
  setIsUserLoggedIn,
  setIsVerifyOpen,
}) => {
  const [responseError, setResponseError] = useState(null);
  console.log("responseError", responseError);
  const backgroundClickhandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoginOpen(!isLoginOpen);
  };
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // formState: { errors },
    // reset,
  } = useForm<dataForm>({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data: dataForm) => {
    const url = "http://localhost:3000/api/login";

    const userData = {
      email: data.email,
      password: data.password,
    };

    console.log(typeof userData, "userData");

    try {
      const response = await axios.post(url, userData);

      const authToken = response.data.token;

      if (authToken) {
        setIsUserLoggedIn(!isUserLoggedIn);
        localStorage.setItem("isUserLoggedIn", String(!isUserLoggedIn));
      }
      setIsVerifyOpen(true);

      localStorage.setItem("authToken", authToken);

      navigate("/");
      setIsLoginOpen(!isLoginOpen);
    } catch (error: any) {
      setResponseError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <div
        onClick={backgroundClickhandler}
        className="top-0 left-0 right-0 w-full h-full pt-[120px] absolute bg-[#181818] bg-opacity-30 "
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col items-center bg-red-500 mx-[800px]"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 bg white bg-white2 rounded-md"
          >
            <h1 className="font-bold text-2xl text-center">login</h1>

            <div className="mb-4">
              <label className="block" htmlFor="email">
                email
              </label>

              <input
                className="rounded"
                type="text"
                id="email"
                {...register("email")}
              />
              {responseError === "Username is wrong" ? (
                <h1>{responseError}</h1>
              ) : (
                ""
              )}
            </div>
            <div className="mb-4">
              <label className="block" htmlFor="password">
                password
              </label>
              <input
                className="rounded pl-2"
                type="password"
                id="password"
                {...register("password")}
              />
              {responseError === "password is wrong" ? (
                <h1>{responseError}</h1>
              ) : (
                ""
              )}
            </div>
            <div className="text-center">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
