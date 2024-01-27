import logo from "../assets/Logo.png";
import Registration from "./Registration";
import { useState } from "react";
const Header = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const registrationCLickHandle = () => {
    setIsRegistrationOpen(!isRegistrationOpen);
  };

  return (
    <div>
      <header className="">
        <div className="flex py-5 px-20 justify-between">
          <img className="h-6" src={logo} alt="logo" />
          <div className="flex gap-2">
            <button
              onClick={registrationCLickHandle}
              className="bg-blue text-white py-3 px-5 rounded-xl"
            >
              რეგისტრაცია
            </button>
            <button className="bg-green text-white py-3 px-5 rounded-xl">
              შესვლა
            </button>
          </div>
        </div>
      </header>
      <div>
        {isRegistrationOpen && (
          <Registration backgroundClick={isRegistrationOpen} toggleRegistration={setIsRegistrationOpen}/>
        )}
      </div>
    </div>
  );
};

export default Header;
