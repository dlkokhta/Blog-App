import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registrationSchema from "./registrationSchema";
import axios from "axios";
import { useState } from "react";

interface RegistrationProps {
  isRegistrationOpen: boolean;
  setIsRegistrationOpen: (value: boolean) => void;
}

interface dataForm {
  username: string;
  email: string;
  password: string;
}

const Registration: React.FC<RegistrationProps> = ({
  isRegistrationOpen,
  setIsRegistrationOpen,
}) => {
  const [backError, setBackError] = useState<string | null>(null);
  const backgroundClickhandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsRegistrationOpen(!isRegistrationOpen);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<dataForm>({ resolver: yupResolver(registrationSchema) });

  const onSubmit = async (data: dataForm) => {
    // Perform any additional logic or API calls here

    const url = "http://localhost:3000/api/registration";

    const userData = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    try {
      await axios.post(url, userData);

      setIsRegistrationOpen(!isRegistrationOpen);

      reset();
    } catch (error: any) {
      setBackError(error.response.data);
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
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 bg white bg-white2 rounded-md  "
        >
          <h1 className="font-bold text-2xl text-center">Registration</h1>
          <div className="mb-4">
            <label className="block" htmlFor="username">
              username
            </label>
            <input
              className="rounded"
              type="text"
              id="username"
              {...register("username")}
            />

            {errors.username ? <p>{errors.username.message}</p> : null}
            {backError === "Username is already taken" ? (
              <p>{backError}</p>
            ) : null}
          </div>
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
            {backError === "Email is already taken" ? <p>{backError}</p> : null}
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

export default Registration;
