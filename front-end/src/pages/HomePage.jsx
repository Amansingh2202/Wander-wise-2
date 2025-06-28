import { Link } from "react-router-dom";


import { BackgroundBeamsDemo } from "../components/HomePageUI/HomeUI";


const HomePage = () => {
  return (
    <div className="min-h-screen bg-black relative  flex flex-col ">

      <div className="relative z-10 text-white flex flex-col justify-center items-center flex-grow">
        <Link to={'./Travel'}>
        <div className="absolute inset-0 z-0 ">
        <BackgroundBeamsDemo />
      </div>
      
        </Link>
      </div>
    </div>
  );
};

export { HomePage };
