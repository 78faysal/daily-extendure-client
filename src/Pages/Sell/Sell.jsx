import { useState } from "react";
import { MdOutlineSell } from "react-icons/md";
import Modal from "../../Components/Modal";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { FaPenToSquare } from "react-icons/fa6";
import Spinner from "../../Components/Spinner";

const Sell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [updateModalData, setUpdateModalData] = useState(null);
  const [updateProduct, setUpdateProduct] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState("");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure(user);

  const {
    data: recentSells,
    isPending: recentSellsLoading,
    refetch,
  } = useQuery({
    queryKey: ["recent sells"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/products?email=${user?.email}`);
      return data;
    },
  });

  const handleProductDelete = (id) => {
    setDeleteItemId(id);
    setDeleteModalOpen(true);
    setDeleteProduct(true);
  };

  const handleUpdateModal = (modalInfo) => {
    setUpdateProduct(true);
    setUpdateModalOpen(true);
    setUpdateModalData(modalInfo);
  };

  if (recentSellsLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="w-full flex justify-center">
        <button className="btn m-3" onClick={() => setIsOpen(true)}>
          Sell Product
          <MdOutlineSell className="text-xl" />{" "}
          {isOpen && (
            <Modal
              modalFor={"sellProduct"}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          )}{" "}
        </button>
      </div>

      <div className="overflow-x-auto">
        <h2 className="text-xl p-3 text-center">Previous Sells</h2>
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
            {recentSells?.map((item) => {
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
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleUpdateModal(item)}
                      className="btn text-xl"
                    >
                      <FaPenToSquare />{" "}
                    </button>
                    <button
                      onClick={() => handleProductDelete(item?._id)}
                      className="btn text-2xl"
                    >
                      <MdOutlineDeleteSweep />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isUpdateModalOpen && updateProduct && (
        <Modal
          modalFor={"updateProduct"}
          isOpen={isUpdateModalOpen}
          setIsOpen={setUpdateModalOpen}
          productInfo={updateModalData}
          setUpdateProduct={setUpdateProduct}
        />
      )}

      {isDeleteModalOpen && deleteProduct && (
        <Modal
          modalFor={"deleteProduct"}
          isOpen={isDeleteModalOpen}
          setIsOpen={setDeleteModalOpen}
          deleteItemId={deleteItemId}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default Sell;
