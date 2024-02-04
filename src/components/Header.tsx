import logo from "../assets/Logo.png";
import Registration from "./Registration";
import { useEffect, useState } from "react";
import Login from "./Login";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import successIcon from "../assets/success.png";
const Header = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const registrationCLickHandle = () => {
    setIsRegistrationOpen(!isRegistrationOpen);
  };
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);

  const navigate = useNavigate();

  const loginClickhandler = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  // useEffect(() => {
  //   if (localStorage.getItem("authToken")) {
  //     setIsVerifyOpen(true);
  //   }
  // }, [isLoginOpen]);

  const logOutClickhandler = () => {
    localStorage.removeItem("authToken");
    navigate("/");
    setIsUserLoggedIn(!isUserLoggedIn);
  };

  const crateBlogClickhandler = () => {
    navigate("/dashboard");
  };

  const verifyButtonClickHandler = () => {
    setIsVerifyOpen(false);
  };

  return (
    <>
      <div>
        <header>
          <div className="flex py-5 px-20 justify-between items-center">
            <Link to="/">
              <img className="h-6" src={logo} alt="logo" />
            </Link>
            <div className="flex gap-2">
              {isUserLoggedIn ? (
                <button
                  className="bg-green text-white py-2 px-5 rounded-xl"
                  onClick={crateBlogClickhandler}
                >
                  Create Blog
                </button>
              ) : (
                <button
                  onClick={registrationCLickHandle}
                  className="bg-blue text-white py-2 px-5 rounded-xl"
                >
                  რეგისტრაცია
                </button>
              )}

              {isUserLoggedIn ? (
                <button
                  onClick={logOutClickhandler}
                  className="bg-green text-white py-2 px-5 rounded-xl"
                >
                  გასვლა
                </button>
              ) : (
                <button
                  onClick={loginClickhandler}
                  className="bg-green text-white py-2 px-5 rounded-xl"
                >
                  შესვლა
                </button>
              )}
            </div>
          </div>
        </header>
        <div>
          {isRegistrationOpen && (
            <Registration
              isRegistrationOpen={isRegistrationOpen}
              setIsRegistrationOpen={setIsRegistrationOpen}
            />
          )}
          {isLoginOpen && (
            <Login
              isLoginOpen={isLoginOpen}
              setIsLoginOpen={setIsLoginOpen}
              isUserLoggedIn={isUserLoggedIn}
              setIsUserLoggedIn={setIsUserLoggedIn}
            />
          )}
        </div>
      </div>

      {isVerifyOpen && (
        <div className="top-0 left-0 right-0 w-full h-full pt-[120px] absolute bg-[#181818] bg-opacity-30 ">
          <div className="flex justify-center">
            <div className="pt-16 pb-10 bg white bg-white2 rounded-md bg-green flex flex-col items-center w-[480px]">
              <img
                className="w-10 h-10 mb-10"
                src={successIcon}
                alt="successIcon"
              />
              <h1 className="font-bold text-xl text-center mb-10">
                sucessfull verification
              </h1>
              <div className="flex justify-center">
                <button
                  onClick={verifyButtonClickHandler}
                  type="button"
                  className="bg-green1 py-2 px-48 rounded-xl text-white text-xl"
                >
                  ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
