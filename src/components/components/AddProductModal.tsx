import ProductForm from "./ProductForm";

type Props = {
  setShowAddModal: (value: boolean) => void;
  showAddModal: boolean;
  refetchProducts: () => void;
};

const AddProductModal = ({showAddModal ,setShowAddModal , refetchProducts} : Props) => {
  if (!showAddModal) return null;
  return (
    <div
      data-testid="add-product-modal"
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 transition-opacity"
    >
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 space-y-6 relative">
        <button className="absolute top-3 left-3 text-gray-500 hover:text-gray-700 text-xl font-bold">
          ✕
        </button>
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          افزودن محصول جدید
        </h2>
        <ProductForm
          onSuccess={() => {
            refetchProducts();
            setShowAddModal(false);
          }}
        />
      </div>
    </div>
  );
};

export default AddProductModal;
