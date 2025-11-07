import { FaEdit, FaTrash } from "react-icons/fa";
import type { Product } from "../../../../../api/productApi";
import { useAuth } from "../../../../../stores/AuthContext";

type Props = {
  products: Product[];
  loading: boolean;
  setShowEditModal: (value: boolean) => void;
  setShowDeleteConfirm: (value: boolean) => void;
  setSelectedProduct: (value: Product) => void;
};

const ProductTableBody = ({
  products,
  loading,
  setShowEditModal,
  setShowDeleteConfirm,
  setSelectedProduct,
}: Props) => {
  const { role } = useAuth();

  return (
    <tbody className="divide-y divide-gray-200" data-testid="product-table-body">
      {loading ? (
        <tr>
          <td
            colSpan={5}
            className="text-center py-4"
            data-testid="loading-state"
          >
            در حال بارگذاری...
          </td>
        </tr>
      ) : !products || products.length === 0 ? (
        <tr>
          <td
            colSpan={5}
            className="text-center py-4"
            data-testid="no-products"
          >
            محصولی یافت نشد.
          </td>
        </tr>
      ) : (
        products.map((product) => (
          <tr
            key={product.id}
            className="hover:bg-gray-50"
            data-testid="product-row"
          >
            <td className="px-4 py-3">{product.name}</td>
            <td className="px-4 py-3">{product.category}</td>
            <td className="px-4 py-3">
              {product.price.toLocaleString()} تومان
            </td>
            <td className="px-4 py-3">{product.stock} عدد</td>
            {role === "admin" && (
              <td
                className="px-4 py-3 space-x-2 space-x-reverse"
                data-testid="admin-actions"
              >
                <button
                  data-testid="edit-btn"
                  onClick={() => {
                    setShowEditModal(true);
                    setSelectedProduct(product);
                  }}
                  className="text-yellow-500 hover:text-yellow-600"
                >
                  <FaEdit />
                </button>
                <button
                  data-testid="delete-btn"
                  onClick={() => {
                    setShowDeleteConfirm(true);
                    setSelectedProduct(product);
                  }}
                  className="text-red-500 hover:text-red-600"
                >
                  <FaTrash />
                </button>
              </td>
            )}
          </tr>
        ))
      )}
    </tbody>
  );
};

export default ProductTableBody;
