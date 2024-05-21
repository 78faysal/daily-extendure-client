import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import SellProductForm from "./Modals/SellProductsForm";
import DeleteModal from "./Modals/DeleteModal";
import PurchaseProductForm from "./Modals/PurchaseProductForm";
import UpdateProductForm from "./Modals/UpdateProductForm";

const Modal = ({
  isOpen,
  setIsOpen,
  modalFor,
  productInfo,
  setUpdateProduct,
  deleteItemId,
  refetch
  // selectedProduct,
}) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure(user);

  const handleSellProduct = (e) => {
    e.preventDefault();

    const form = e.target;
    const productName = form.productName.value;
    const photoURL = form.photoURL.value;
    const sku = form.sku.value;
    const quantity = form.quantity.value;
    const price = form.price.value;
    const description = form.description.value;
    const seller = user?.email;

    const regex = /^[a-zA-Z0-9]{5,15}$/;

    if(productInfo?.quantity < quantity){
      return toast.error(`You have ${productInfo?.quantity} in sotck`)
    }

    if(!regex.test(sku)){
      return toast.error('SKU must be alphanumeric & between 5-15 characters')
    }

    const sellProductInfo = {
      productName,
      photoURL,
      sku,
      quantity: productInfo?.quantity - quantity,
      price,
      description,
      seller,
    };
    axiosSecure
      .post("/products", sellProductInfo)
      .then((data) => {
        if (data.data.insertedId) {
          setIsOpen(false);
          toast.success("Published for Sell");
          refetch();
        }
      })
      .catch((error) => {
        // console.log(error);
        if (error) {
          toast.error('Something went wrong');
        }
      });
  };

  const handleUpdateProduct = (e, id) => {
    e.preventDefault();

    const form = e.target;
    const productName = form.productName.value;
    const photoURL = form.photoURL.value;
    const sku = form.sku.value;
    const quantity = form.quantity.value;
    const price = form.price.value;
    const description = form.description.value;
    const seller = user?.email;

    const productInfo = {
      productName,
      photoURL,
      sku,
      quantity,
      price,
      description,
      seller,
    };

    axiosSecure
      .patch(`/products/${id}`, productInfo)
      .then((data) => {
        if (data.data?.modifiedCount > 0) {
          form.reset();
          setIsOpen(false);
          toast.success("Info Updated");
          refetch();
        }
      })
      .catch((error) => {
        if (error) {
          // console.log(error);
          toast.error(error?.response?.data?.message);
        }
      });
  };

  const handlePurchaseProduct = (quantity) => {
    // console.log(quantity);
    if(quantity > productInfo?.quantity){
      return toast.error(`${productInfo?.quantity} Items available`)
    }

    const purchaseInfo = {
      productName: productInfo?.productName,
      photoURL: productInfo?.photoURL,
      sku: productInfo?.sku,
      quantity: quantity,
      price: productInfo?.price * quantity,
      description: productInfo?.description,
      buyer: user?.email,
      buyerName: user?.displayName,
      buyerImage: user?.photoURL,
      seller: productInfo?.seller,
      status: "sold",
    };

    const updatedProductInfo = {
      productName: productInfo?.productName,
      photoURL: productInfo?.photoURL,
      sku: productInfo?.sku,
      quantity: productInfo?.quantity - quantity,
      price: productInfo?.price,
      description: productInfo?.description,
      buyer: user?.email,
      seller: productInfo?.seller,
      status: "sold",
    };

    // console.log(purchaseInfo);

    axiosSecure
      .patch(`/products/${productInfo?._id}`, updatedProductInfo)
      .then((data) => {
        if (data.data?.modifiedCount > 0) {
          axiosSecure
            .post(`/purchase`, purchaseInfo)
            .then((data) => {
              if (data.data?.insertedId) {
                toast.success("Purchase Successfull");
                setIsOpen(false);
                refetch();
              }
            })
            .catch((error) => {
              if (error) {
                toast.error("Something went wrong");
              }
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleProductDelete = () => {
    axiosSecure.delete(`/products/${deleteItemId}`).then((data) => {
      if(data.data.deletedCount > 0){
        toast.success('Item Deleted')
        setIsOpen(false);
        refetch();
      }
    });
  };

  const handlePurchaseDelete = () => {
    axiosSecure.delete(`/purchase/${deleteItemId}`)
    .then((data) => {
      if(data.data.deletedCount > 0){
        toast.success('Item Deleted')
        setIsOpen(false);
        refetch()
      }
    });
  };

  return (
    <div>
      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={close}
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6">
                  <DialogTitle
                    as="h3"
                    className="text-base font-medium text-black text-center"
                  >
                    {/* {modalFor === "sellProduct"
                      ? "Sell Product"
                      : modalFor === "updateProduct"
                      ? "Update Product"
                      : "Purchase Product"} */}
                  </DialogTitle>

                  {modalFor === "sellProduct" && (
                    <SellProductForm
                      handleSellProduct={handleSellProduct}
                      // productInfo={productInfo}
                      productInfo={productInfo}
                      setIsOpen={setIsOpen}
                    />
                  )}

                  {modalFor === "updateProduct" && isOpen && (
                    <UpdateProductForm
                      handleUpdateProduct={handleUpdateProduct}
                      productInfo={productInfo}
                      setIsOpen={setIsOpen}
                      setUpdateProduct={setUpdateProduct}
                    />
                  )}

                  {modalFor === "purchaseProduct" && (
                    <PurchaseProductForm
                      handlePurchaseProduct={handlePurchaseProduct}
                      productInfo={productInfo}
                      setIsOpen={setIsOpen}
                    />
                  )}

                  {modalFor === "deleteProduct" && (
                    <DeleteModal
                      handleDelete={handleProductDelete}
                      productInfo={productInfo}
                      setIsOpen={setIsOpen}
                    />
                  )}

                  {modalFor === "deletePurchase" && (
                    <DeleteModal
                      handleDelete={handlePurchaseDelete}
                      productInfo={productInfo}
                      setIsOpen={setIsOpen}
                    />
                  )}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Modal;
