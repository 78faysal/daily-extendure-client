import { Button } from "@headlessui/react";

const SellProductForm = ({ handleSellProduct, setIsOpen, productInfo }) => {
  console.log(productInfo);
  return (
    <form className="space-y-2" onSubmit={handleSellProduct}>
      <input
        className="rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 w-full"
        type="text"
        placeholder="Product Name"
        name="productName"
        defaultValue={productInfo?.productName}
        required
      />
      <input
        className="rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 w-full"
        type="text"
        placeholder="Photo URL"
        name="photoURL"
        defaultValue={productInfo?.photoURL}
        required
      />
      <input
        className="rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 w-full"
        type="text"
        placeholder="SKU"
        name="sku"
        defaultValue={productInfo?.sku}
        required
      />
      <input
        className="rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 w-full"
        type="number"
        placeholder="Quantity"
        name="quantity"
        defaultValue={productInfo?.quantity}
        required
      />
      <input
        className="rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 w-full"
        type="number"
        placeholder="Price"
        name="price"
        defaultValue={productInfo?.price}
        required
      />
      <textarea
        className="rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 w-full"
        placeholder="Description"
        name="description"
        defaultValue={productInfo?.description}
        required
      />
      <div className="flex gap-3">
        <Button
          className="w-full cursor-pointer rounded-lg bg-gray-400 hover:bg-gray-300 px-6 py-2 font-medium text-white hover:text-black"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </Button>
        <input
          className="w-full items-center gap-2 rounded-lg bg-gray-700 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600"
          type="submit" value={'Sell Product'}
        />
      </div>
    </form>
  );
};

export default SellProductForm;
