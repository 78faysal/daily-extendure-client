import { Button } from "@headlessui/react";
import { useState } from "react";
import toast from "react-hot-toast";

const PurchaseProductForm = ({
  handlePurchaseProduct,
  setIsOpen,
  productInfo,
}) => {
  const { photoURL, productName, description, price } = productInfo;
  const [quantity, setQuantity] = useState(1);
  //   console.log(productInfo);

  const handleDecrease = () => {
    if(quantity <= 1){
      return toast.error('Minimum One Item');
    }
    setQuantity(quantity - 1)
  }
  return (
    <div>
      <div className="text-center space-y-2">
        <img
          className="h-60 w-full object-cover rounded"
          src={photoURL}
          alt=""
        />
        <h2 className="text-xl font-semibold">{productName}</h2>
        <p className="text-gray-500">{description}</p>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">
              ${price}
              <span className="text-sm font-normal">(Per Item)</span>
            </h2>
          </div>

          <div className="flex items-center justify-center gap-2 text-xl">
            <button
              className="btn text-2xl"
              onClick={handleDecrease}
            >
              -
            </button>
            <p>{quantity}</p>
            <button
              className="btn text-xl"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            className="w-full items-center gap-2 rounded-lg bg-gray-600 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <button onClick={() => handlePurchaseProduct(quantity)} className="rounded-lg bg-slate-800 px-6 py-2 text-[12px] font-semibold text-white duration-300 hover:bg-slate-950 sm:text-sm md:text-base w-full">
            Confirm Order
          </button>
        </div>
      </div>

      {/* <form className="space-y-2" onSubmit={(e) =>handlePurchaseProduct(e, _id)}>
      <input
        className="rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 w-full"
        type="text"
        placeholder="Product Name"
        name="productName"
        defaultValue={productName}
        required
      />
      <input
        className="rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 w-full"
        type="text"
        placeholder="Photo URL"
        defaultValue={photoURL}
        name="photoURL"
        required
      />
      <input
        className="rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 w-full"
        type="text"
        placeholder="SKU"
        name="sku"
        defaultValue={sku}
        required
      />
      <input
        className="rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 w-full"
        type="number"
        placeholder="Quantity"
        defaultValue={1}
        name="quantity"
        required
      />
      <input
        className="rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 w-full"
        type="number"
        placeholder="Price"
        defaultValue={price}
        name="price"
        required
      />
      <textarea
        className="rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 w-full"
        placeholder="Description"
        defaultValue={description}
        name="description"
        required
      />
      <div className="flex gap-3">
        <input
          className="w-full cursor-pointer rounded-lg bg-gray-400 hover:bg-gray-300 px-6 py-2 font-medium text-white hover:text-black"
          type="submit" value="Confirm"
        />
        <Button
          className="w-full items-center gap-2 rounded-lg bg-gray-700 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </Button>
      </div>
    </form> */}
    </div>
  );
};

export default PurchaseProductForm;
