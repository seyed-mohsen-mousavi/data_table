import { useState } from "react";
import { productApi } from "../../../../../../api/productApi";
import type { Product } from "../../../../../../api/productApi";

type Props = {
  setShowDeleteConfirm: (value: boolean) => void;
  showDeleteConfirm: boolean;
  product: Product | null;
  refetchProducts: () => void;
};

const DeleteProductDialog = ({setShowDeleteConfirm ,showDeleteConfirm, product , refetchProducts} : Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleDelete = async () => {
    if(!product) return
    try {
      await productApi.deleteProduct(product.id)
      await refetchProducts()
      setShowDeleteConfirm(!showDeleteConfirm)
    } catch (error) {
      setError("خطایی در حذف محصول رخ داده است")
      console.error(error)
    }finally {
      setLoading(false)
      setError("")
    }
  };

  return (
    <div
      data-testid="delete-product-dialog"
      className={`fixed ${showDeleteConfirm ? "opacity-100 visible" : "opacity-0 invisible"} inset-0 bg-black/30 flex items-center justify-center z-50 transition-opacity`}
    >
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-lg p-6 space-y-4 text-center">
        <p className="text-lg font-medium text-gray-800">
          آیا از حذف محصول <span className="font-bold">{product?.name}</span>{" "}
          مطمئن هستید؟
        </p>
        {error && <p className="text-red-600">{error}</p>}
        <div className="flex justify-center gap-4 pt-4">
          <button
            className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800"
            disabled={loading}
            onClick={()=> setShowDeleteConfirm(false)}
          >
            انصراف
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white"
            disabled={loading}
          >
            {loading ? "در حال حذف..." : "حذف"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductDialog;
