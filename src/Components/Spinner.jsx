const Spinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-20 h-20  border-l-2 border-black rounded-full flex justify-center items-center animate-[spin_1.8s_linear_infinite]">
        <div className="w-16 h-16  border-b-2 border-gray-500 rounded-full flex justify-center items-center animate-[spin_1.8s_linear_infinite]">
          <div className="w-10 h-10  border-r-2  border-gray-400 rounded-full animate-[spin_1.8s_linear_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
