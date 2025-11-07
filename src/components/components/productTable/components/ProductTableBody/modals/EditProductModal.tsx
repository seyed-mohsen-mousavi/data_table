import ProductForm from "../../../../ProductForm";
import type { Product } from "../../../../../../api/productApi";

type Props = {
  showEditModal: boolean;
  setShowEditModal: (value: boolean) => void;
  product: Product | null;
  refetchProducts: () => void;
};

const EditProductModal = ({showEditModal,setShowEditModal,product , refetchProducts}: Props) => {
  if (!showEditModal) return null;
  return (
    <div
      data-testid="edit-product-modal"
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
    >
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 space-y-6 relative">
        <button onClick={()=> setShowEditModal(false)} className="absolute top-3 left-3 text-gray-500 hover:text-gray-700 text-xl font-bold">
          ✕
        </button>
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          ویرایش محصول
        </h2>
        <ProductForm
          initialValues={product}
          onSuccess={() => {
            setShowEditModal(false);
            refetchProducts();
          }}
        />
      </div>
    </div>
  );
};

export default EditProductModal;
