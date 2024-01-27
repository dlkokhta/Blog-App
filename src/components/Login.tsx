import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "./loginSchema";
import axios from "axios";

interface RegistrationProps {
  backgroundClick: boolean;
  toggleRegistration: (value: boolean) => void;
}

interface dataForm {
  email: string;
  password: string;
}

const Login: React.FC<RegistrationProps> = ({
  backgroundClick,
  toggleRegistration,
}) => {
  const backgroundClickhandler = (e) => {
    e.preventDefault();
    toggleRegistration(!backgroundClick);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<dataForm>({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data: dataForm) => {
    console.log("clicked");
    console.log(data);
    // Perform any additional logic or API calls here

    const url = "http://localhost:3000/api/login";

    const userData = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axios.post(url, userData);
      console.log("response!!!!!!", response);
      const authToken = response.data.token;
      console.log("authToken", authToken);
      localStorage.setItem("authToken", authToken);
      reset();
    } catch (error) {
      console.log(error);
    }
    toggleRegistration(!backgroundClick);
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
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 bg white bg-white2 rounded-md bg-green "
        >
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
            {errors.email ? <p>{errors.email.message}</p> : null}
          </div>
          <div className="mb-4">
            <label className="block" htmlFor="password">
              password
            </label>
            <input
              className="rounded pl-2"
              type="text"
              id="password"
              {...register("password")}
            />
            {errors.password ? <p>{errors.password.message}</p> : null}
          </div>
          <div className="text-center">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
