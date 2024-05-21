import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom";
import { MdOutlineDeleteSweep, MdOutlineSell } from "react-icons/md";
import { useState } from "react";
import Modal from "../../Components/Modal";
import Spinner from "../../Components/Spinner";

const Purchase = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure(user);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [purchaseDelete, setPurchaseDelete] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState("");

  const { data: recentPurchase, isPending: recentPurchaseLoading, refetch } = useQuery({
    queryKey: ["recent-purchases"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/purchase?email=${user?.email}`);
      return data;
    },
  });

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const handlePurchaseDelete = (id) => {
    setDeleteItemId(id);
    setDeleteModalOpen(true);
    setPurchaseDelete(true);
  };

  // useEffect(() => {
  //   refetch();
  // }, [recentPurchase, isOpen, refetch])

  if(recentPurchaseLoading){
    return <Spinner />
  }

  return (
    <div>
      <div className="w-full flex justify-center m-3">
      <Link to={"/products"} className="btn">
        <LuShoppingCart className="text-xl" /> Buy More
      </Link>
      </div>
      <div className="overflow-x-auto">
        <h2 className="text-xl p-3 text-center">Purchase History</h2>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recentPurchase?.map((item) => {
              return (
                <tr key={item?._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item?.photoURL} alt="" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item?.productName}</td>
                  <td>{item?.quantity}</td>
                  <td>${item?.price}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button className="btn" onClick={() => openModal(item)}>
                        Sell
                        <MdOutlineSell className="text-xl" />{" "}
                      </button>

                      <button
                        onClick={() => handlePurchaseDelete(item?._id)}
                        className="btn text-2xl"
                      >
                        <MdOutlineDeleteSweep />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isOpen && (
        <Modal
          modalFor={"sellProduct"}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          productInfo={selectedProduct}
          refetch={refetch}
        />
      )}{" "}


      {isDeleteModalOpen && purchaseDelete && (
        <Modal
          modalFor={"deletePurchase"}
          isOpen={isDeleteModalOpen}
          setIsOpen={setDeleteModalOpen}
          deleteItemId={deleteItemId}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default Purchase;
