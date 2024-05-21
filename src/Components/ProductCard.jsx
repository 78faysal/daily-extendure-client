import { useState } from "react";
import useAuth from "../Hooks/useAuth";
import Modal from "./Modal";

const ProductCard = ({
  photoURL,
  productName,
  description,
  price,
  seller,
  quantity,
  productInfo,
  refetch
}) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  // console.log(modalInfo);
  return (
    <div className="mx-auto w-[80%] mt-5 space-y-4 rounded-lg bg-gray-100 p-6 shadow-lg">
      <img
        className="rounded-lg object-cover w-full h-40"
        src={photoURL}
        alt=""
      />
      <div className="grid gap-2">
        <h1 className="text-lg font-semibold ">
          {productName}{" "}
          {user?.email === seller && (
            <div className="badge badge-secondary">My Product</div>
          )}
        </h1>
        <p className="text-sm text-gray-500 ">{description}</p>
        <div className="flex justify-between">
          {quantity > 0 ? <p className="text-sm ">Stock: {quantity}</p> : <p className="text-sm text-red-400">Stock Out</p>}
          <div className="text-lg font-semibold">${price}</div>
        </div>
      </div>
      <div className="flex gap-4">
        {quantity > 0 ? <button
          onClick={handleModalOpen}
          className="rounded-lg bg-slate-800 px-6 py-2 text-[12px] font-semibold text-white duration-300 hover:bg-slate-950 sm:text-sm md:text-base w-full"
        >
          Purchase Now
        </button> : <button
          className="rounded-lg btn btn-disabled w-full"
        >
          Purchase Now
        </button>}
        {/* <button className="rounded-md border border-black px-4 dark:border-white dark:hover:text-slate-800 dark:hover:bg-white  py-2  duration-300 hover:bg-gray-200">
          View Details
        </button> */}
      </div>

      {isOpen && (
        <Modal
          modalFor={"purchaseProduct"}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          productInfo={productInfo}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default ProductCard;
