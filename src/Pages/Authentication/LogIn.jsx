// import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const LogIn = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password)
    .then(result => {
        console.log('result');
        if(result.user){
            toast.success('Logged In Successful');
            navigate('/')
        }
    })
    .catch(error => {
      if(error){
        if(error?.message === 'FirebaseError: Firebase: Error (auth/invalid-credential).'){
          toast.error('Invalid Email or Pass')
        }
        else{
          toast.error('Something went wrong')
        }
      }
    })
  };
  return (
    <div>
      <div className="flex h-screen items-center justify-center bg-[#8EA7E9]/20 p-6 md:p-0">
        <div className="flex h-full w-full overflow-hidden rounded-xl shadow-md  md:h-[90%] md:w-[80%] lg:h-[80%]">
          {/* register design side  */}
          <div className="relative hidden h-full items-center justify-center bg-[#8EA7E9] md:flex md:w-[60%] lg:w-[40%]">
            <div className="absolute -top-2 left-[20%] h-16 w-16 rounded-full bg-gradient-to-br  from-white via-[#83a2f7] to-[#4b6bc4]"></div>
            <div className="absolute bottom-[18%] left-[20%] h-20 w-20 rounded-full bg-gradient-to-br  from-white via-[#83a2f7] to-[#4b6bc4]"></div>
            <div className="absolute -right-7 top-[50%] h-14 w-14 -translate-y-1/2 rounded-full bg-gradient-to-br from-white via-[#83a2f7] to-[#4b6bc4] transition-all"></div>
            <div className="absolute left-[50%] top-[22%] h-24 w-24 -translate-x-1/2 rounded-full  bg-gradient-to-br from-white via-[#83a2f7] to-[#4b6bc4]"></div>
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-medium text-white/80 ">Sign In</h2>
              <p className="animate-pulse text-sm text-white/60">
                Please Enter You Information
              </p>
            </div>
          </div>
          {/* input side  */}
          <div className="flex w-full flex-col justify-center bg-white py-10 lg:w-[60%]">
            <h2 className="pb-8 text-center text-3xl font-bold text-[#8EA7E9]">
              Login Here
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex  w-full flex-col items-center justify-center gap-4"
            >
              <input
                className="w-[80%] rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 md:w-[60%]"
                type="email"
                placeholder="Email"
                name="email"
                required
              />
              <input
                className="w-[80%] rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 md:w-[60%]"
                type="password"
                placeholder="Password"
                name="password"
                required
              />
              <p className="text-[14px] text-gray-500">
                Do not have an account ?{" "}
                <Link to={"/register"} className="text-blue-400">
                  Create one
                </Link>
              </p>
              <input
                className="w-[80%] cursor-pointer hover:bg-blue-300 rounded-lg bg-[#8EA7E9] px-6 py-2 font-medium text-white md:w-[60%]"
                type="submit"
              />
            </form>
            {/* divider  */}
            {/* sign with google */}
            {/* <div className="my-8 flex items-center px-8">
                        <hr className="flex-1" />
                        <div className="mx-4 text-gray-400">OR</div>
                        <hr className="flex-1" />
                    </div>
                    <div>
                        <div>
                            <button className="flex items-center gap-3 font-semibold text-lg mx-auto text-gray-400 btn">Continue with <FcGoogle/></button>
                        </div>
                    </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
