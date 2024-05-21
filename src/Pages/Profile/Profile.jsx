import { useQuery } from "@tanstack/react-query";
import { RiMailSendLine } from "react-icons/ri";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { IoLocationOutline } from "react-icons/io5";
import { MdFingerprint } from "react-icons/md";
import { AiOutlineShopping } from "react-icons/ai";
import { BiIdCard } from "react-icons/bi";
import { FaRegCreditCard } from "react-icons/fa";
import Spinner from "../../Components/Spinner";

const Profile = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure(user);

  const { data: userInfo, isPending: profileInfoLoading } = useQuery({
    queryKey: ["profileInfo"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/userInfo?email=${user?.email}`);
      return data;
    },
  });

  const { data: statistics, isPending: statisticsLoading } = useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/statistics?email=${user?.email}`
      );
      return data;
    },
  });

  // console.log(statistics?.customersInfo);

  if(profileInfoLoading || statisticsLoading){
    return <Spinner />
  }

  return (
    <div>
      <div className="md:mx-10 mx-5 mt-10">
        <div className="stats bg-base-200 shadow w-full">
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Total Products</div>
            <div className="stat-value text-primary">
              {statistics?.availableProducts}
            </div>
            <div className="stat-desc">Available items in Published list</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Total Amount</div>
            <div className="stat-value text-secondary">
              ${statistics?.totalAmount}
            </div>
            <div className="stat-desc">Total revenue of sells</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary flex flex-col gap-2 items-center">
              <div className="avatar online">
                <div className="w-16 rounded-full">
                  <img
                    src={
                      user?.photoURL ? user?.photoURL : "https://rb.gy/ceb0f4"
                    }
                  />
                </div>
              </div>
              <button
                onClick={() => logOut()}
                className="btn border-black border-dashed"
              >
                Log Out
              </button>
            </div>
            <div className="stat-title">Total Sells</div>
            <div className="stat-value">{statistics?.totalSell}</div>
            <div className="stat-desc text-secondary">
              All sells of your products
            </div>
          </div>
        </div>
      </div>

      <div className="md:flex gap-10 m-5 md:m-10">
        <div className="bg-gray-200 md:w-[50%] py-10 md:px-20 px-10 mx-auto rounded-xl">
          <h2 className="text-xl font-semibold mb-5 flex items-center gap-2 justify-center">
            _Personal Info
          </h2>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <MdFingerprint /> {userInfo?.personalInfo?.name}
          </h2>
          <p className="text-lg flex items-center gap-2">
            <RiMailSendLine /> Mail: {userInfo?.personalInfo?.email}
          </p>
          <p className="text-lg flex items-center gap-2">
            <IoLocationOutline /> Address: {userInfo?.personalInfo?.address}
          </p>
        </div>

        <div className="bg-gray-200 md:w-[50%] py-10 md:px-20 max-sm:mt-5 px-10 mx-auto rounded-xl">
          <h2 className="text-xl font-semibold mb-5 flex items-center gap-2 justify-center">
            _Business Info
          </h2>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <AiOutlineShopping />
            Name: {userInfo?.businessInfo?.shopName}
          </h2>
          <p className="text-lg flex items-center gap-2">
            <IoLocationOutline /> Address: {userInfo?.businessInfo?.shopAddress}
          </p>
          <p className="text-lg flex items-center gap-2">
            <BiIdCard /> Licence: {userInfo?.businessInfo?.tradeLicence}
          </p>
          <p className="text-lg flex items-center gap-2">
            <FaRegCreditCard /> BIN: {userInfo?.businessInfo?.BIN}
          </p>
        </div>
      </div>

      <div className="md:mx-10 max-sm:mx-5 mb-10 bg-base-200 p-4 rounded-xl">
        <h2 className="text-lg font-semibold text-center">Customer List</h2>
        {statistics?.customersInfo?.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Customer Name</th>
                <th>Customer Email</th>
              </tr>
            </thead>
            <tbody>
              {statistics?.customersInfo?.map((item, idx) => {
                return (
                  <tr key={idx}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={item?.buyerImage} alt="" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item?.buyerName}</td>
                    <td>{item?.buyer}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Profile;
