import background from "../assets/background.png";

const Main = () => {
  return (
    <div className="pb-16">
      <div className="flex justify-between items-center px-20 bg-white2">
        <h1 className="font-bold text-5xl">ბლოგი</h1>
        <img src={background} alt="background" />
      </div>
    </div>
  );
};

export default Main;
