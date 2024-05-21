// import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const Register = () => {
    const axiosSecure = useAxiosSecure();
    const {createUser, updateUser, user} = useAuth();
    const navigate = useNavigate(user);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const address = form.address.value;
    const nid = form.nid.value;
    const email = form.email.value;
    const password = form.password.value;

    const shopName = form.shopName.value;
    const shopAddress = form.shopAddress.value;
    const BIN = form.bin.value;
    const tradeLicence = form.tradeLicence.value;

    const userInfo = {
      personalInfo: { name, photo, address, nid, email, password },
      businessInfo: { shopName, shopAddress, BIN, tradeLicence },
    };

    createUser(email, password)
    .then(result => {
        if(result.user){
            axiosSecure.post('/users', userInfo)
            .then(data => {
                if(data.data?.insertedId){
                    toast.success('Register Successful')
                    navigate('/');
                    updateUser(name, photo)
                }
            })
        }
    })
  };
  return (
    <div>
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
                <h2 className="text-3xl font-medium text-white/80 ">Join Us</h2>
                <p className="animate-pulse text-sm text-white/60">
                  Please Enter You Information
                </p>
              </div>
            </div>
            {/* input side  */}
            <div className="flex w-full flex-col justify-center bg-white py-10 lg:w-[60%] overflow-auto">
              <h2 className="pb-3 md:mt-18 text-center text-3xl font-bold text-[#8EA7E9]">
                Register Now
              </h2>
              <form
                onSubmit={handleSubmit}
                className="flex w-[80%]  md:w-[65%] mx-auto w-full flex-col items-center justify-center gap-4"
              >
                <label className="text-gray-500" htmlFor="">
                  Personal Info
                </label>
                <div className="flex gap-3">
                <input
                  className="w-full rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 "
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  required
                />
                <input
                  className="w-full rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 "
                  type="text"
                  placeholder="Profle Photo"
                  name="photo"
                  required
                />
                </div>
                <div className="flex gap-3">
                  <input
                    className="w-[80%] rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 md:w-[60%]"
                    type="text"
                    placeholder="Address"
                    name="address"
                    required
                  />
                  <input
                    className="w-[80%] rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 md:w-[60%]"
                    type="text"
                    placeholder="NID"
                    name="nid"
                    required
                  />
                </div>
                <div className="flex gap-3">
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
                </div>

                <label className="text-gray-500" htmlFor="">
                  Business Info
                </label>
                <div className="flex gap-3">
                  <input
                    className="w-[80%] rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 md:w-[60%]"
                    type="text"
                    placeholder="Shop Name"
                    name="shopName"
                    required
                  />
                  <input
                    className="w-[80%] rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 md:w-[60%]"
                    type="text"
                    placeholder="Address"
                    name="shopAddress"
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <input
                    className="w-[80%] rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 md:w-[60%]"
                    type="text"
                    placeholder="BIN"
                    name="bin"
                    required
                  />
                  <input
                    className="w-[80%] rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 md:w-[60%]"
                    type="text"
                    placeholder="Trade Licence"
                    name="tradeLicence"
                    required
                  />
                </div>

                <p className="text-[14px] text-gray-500">
                  Already have an account ?{" "}
                  <Link to={"/login"} className="text-blue-400 ">
                    LogIn Now
                  </Link>
                </p>
                <input
                  className="w-full cursor-pointer rounded-lg bg-[#8EA7E9] hover:bg-blue-300 px-6 py-2 font-medium text-white "
                  type="submit" 
                />
              </form>
              {/* divider  */}
              {/* sign with google */}
              {/* <div className="my-5 flex items-center px-8">
                <hr className="flex-1" />
                <div className="mx-4 text-gray-400">OR</div>
                <hr className="flex-1" />
              </div>
              <div>
                <div>
                  <button className="flex items-center gap-3 font-semibold text-lg mx-auto text-gray-400 btn">
                    Continue with <FcGoogle />
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
