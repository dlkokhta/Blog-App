import logo from "../assets/Logo.png";
const Header = () => {
  return (
    <header className="">
      <div className="flex py-5 px-20 justify-between">
        <img className="h-6" src={logo} alt="logo" />
        <div className="flex gap-2">
          <button className="bg-blue text-white py-3 px-5 rounded-xl">
            შექმენი ბლოგი
          </button>
          <button className="bg-green text-white py-3 px-5 rounded-xl">
            შესვლა
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
