import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();


  return (
    <div className="flex justify-center items-center text-center min-h-screen">
      <div className="my-auto space-y-3">
        <h2 className="text-4xl font-bold">404</h2>
        <p className="text-2xl font-semibold">Page Not Found</p>
        <button onClick={() => navigate(-1)} className="flex items-center gap-4 mx-auto transition ease-in-out delay-150 bg-gray-200 p-3 px-5 rounded-lg hover:-translate-y-1 hover:scale-110 hover:bg-gray-300 duration-300">
          <IoMdArrowBack /> Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
