import { Button } from "@headlessui/react";

const DeleteModal = ({ setIsOpen, handleDelete }) => {
    
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-center">Delete Item?</h2>
      <p className="text-gray-500">
        Are you sure? If you delete this, it can not be recover letter. 
      </p>

      <div className="flex gap-3">
        <Button
          className="w-full cursor-pointer rounded-lg bg-gray-400 hover:bg-gray-300 px-6 py-2 font-medium text-white hover:text-black"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </Button>
        <button
          className="w-full items-center gap-2 rounded-lg bg-gray-700 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600"
          type="submit" onClick={handleDelete}
        >
          Sure. Delete It
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
