import { Button } from "@headlessui/react";

const UpdateProductForm = ({ handleUpdateProduct, setIsOpen, productInfo, setUpdateProduct }) => {
  const { photoURL, productName, description, price, _id, sku, quantity } =
    productInfo;
  return (
    <form className="space-y-2" onSubmit={(e) => handleUpdateProduct(e, _id)}>
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
        name="photoURL"
        defaultValue={photoURL}
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
        name="quantity"
        defaultValue={quantity}
        required
      />
      <input
        className="rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 w-full"
        type="number"
        placeholder="Price"
        name="price"
        defaultValue={price}
        required
      />
      <textarea
        className="rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 w-full"
        placeholder="Description"
        name="description"
        defaultValue={description}
        required
      />
      <div className="flex gap-3">
        <Button
          className="w-full cursor-pointer rounded-lg bg-gray-400 hover:bg-gray-300 px-6 py-2 font-medium text-white hover:text-black"
          onClick={() => setIsOpen(false) && setUpdateProduct(false)}
        >
          Cancel
        </Button>
        <input
          className="w-full items-center gap-2 rounded-lg bg-gray-700 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600"
          type="submit" value={"Update"}
        />
      </div>
    </form>
  );
};

export default UpdateProductForm;
