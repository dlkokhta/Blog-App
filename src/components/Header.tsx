import logo from "../assets/Logo.png";
import Registration from "./Registration";
import { useState } from "react";
import Login from "./Login";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const registrationCLickHandle = () => {
    setIsRegistrationOpen(!isRegistrationOpen);
  };
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const navigate = useNavigate();
  const loginClickhandler = () => {
    setIsLoginOpen(!isLoginOpen);
    if (isUserLoggedIn) {
      localStorage.removeItem("authToken");
      navigate("/");
    }
  };

  return (
    <div>
      <header className="">
        <div className="flex py-5 px-20 justify-between items-center">
          <Link to="/">
            <img className="h-6" src={logo} alt="logo" />
          </Link>
          <div className="flex gap-2">
            <button
              onClick={registrationCLickHandle}
              className="bg-blue text-white py-2 px-5 rounded-xl"
            >
              რეგისტრაცია
            </button>
            <button
              onClick={loginClickhandler}
              className="bg-green text-white py-2 px-5 rounded-xl"
            >
              {isUserLoggedIn ? "გასვლა" : "შესვლა"}
            </button>
          </div>
        </div>
      </header>
      <div>
        {isRegistrationOpen && (
          <Registration
            backgroundClick={isRegistrationOpen}
            toggleRegistration={setIsRegistrationOpen}
          />
        )}
        {isLoginOpen && (
          <Login
            backgroundClick={isLoginOpen}
            toggleRegistration={setIsLoginOpen}
            isUserLoggedIn={isUserLoggedIn}
            setIsUserLoggedIn={setIsUserLoggedIn}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
