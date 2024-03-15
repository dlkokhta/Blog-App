import Registration from "./Registration";
import { useState } from "react";
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

  const savedUserLoggedInState = localStorage.getItem("isUserLoggedIn");
  console.log("savedUserLoggedInState", savedUserLoggedInState);

  const navigate = useNavigate();

  const loginClickhandler = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const logOutClickhandler = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isUserLoggedIn");
    navigate("/");
    setIsUserLoggedIn(true);
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
          <div className="flex py-5 px-20 justify-between items-center bg-white2 mt-5 rounded-xl">
            <Link to="/">
              <h1 className="text-3xl font-bold text-red-600">BLOG</h1>
            </Link>
            <div className="flex gap-2">
              {savedUserLoggedInState ? (
                <button
                  className="bg-green text-white ext-lg py-2 px-5 rounded-xl"
                  onClick={crateBlogClickhandler}
                >
                  Create Blog
                </button>
              ) : (
                <button
                  onClick={registrationCLickHandle}
                  className="bg-blue text-white text-md py-2 px-5 rounded-xl"
                >
                  registration
                </button>
              )}

              {savedUserLoggedInState ? (
                <button
                  onClick={logOutClickhandler}
                  className="bg-green text-white text-md py-2 px-5 rounded-xl"
                >
                  log out
                </button>
              ) : (
                <button
                  onClick={loginClickhandler}
                  className="bg-green text-white text-md py-2 px-5 rounded-xl"
                >
                  Log in
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
              setIsVerifyOpen={setIsVerifyOpen}
            />
          )}
        </div>
      </div>

      {isVerifyOpen && (
        <div className="top-0 left-0 right-0 w-full h-full pt-[120px] absolute bg-[#181818] bg-opacity-30 ">
          <div className="flex justify-center">
            <div className="pt-16 pb-10 bg white rounded-md bg-white flex flex-col items-center w-[480px]">
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
