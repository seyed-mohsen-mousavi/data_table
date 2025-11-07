import { FaEdit, FaTrash } from "react-icons/fa";
import type { Product } from "../../../../../api/productApi";
import { useAuth } from "../../../../../stores/AuthContext";

type Props = {
  products: Product[];
  loading: boolean;
  setShowEditModal: (value: boolean) => void;
  setShowDeleteConfirm: (value: boolean) => void;
  setSelectedProduct : (value : Product) => void;
};

const ProductTableBody = ({products , loading , setShowEditModal , setShowDeleteConfirm ,setSelectedProduct} : Props) => {
  const {role} = useAuth()
  if(loading) {
     return  <tr>
    <td colSpan={5} className="text-center py-4">
      در حال بارگذاری...
    </td>
  </tr>;
  }
  if(!products || products.length <= 1) {
  return <tbody>
    <tr>
      <td colSpan={5} className="text-center py-4">
        محصولی یافت نشد.
      </td>
    </tr>
  </tbody>;
  }
  return (
    <tbody className="divide-y divide-gray-200">
      {products.map((product) => (
        <tr key={product.id} className="hover:bg-gray-50">
          <td className="px-4 py-3">{product.name}</td>
          <td className="px-4 py-3">{product.category}</td>
          <td className="px-4 py-3">{product.price.toLocaleString()} تومان</td>
          <td className="px-4 py-3">{product.stock} عدد</td>
         {
          role === "admin" &&  <td className="px-4 py-3 space-x-2 space-x-reverse">
            
                          <button
                          onClick={()=>{
                            setShowEditModal(true )
                            setSelectedProduct(product)
                          }}
              className="text-yellow-500 hover:text-yellow-600"
            >
              <FaEdit />
            </button>
                          <button
                           onClick={()=>{
                            setShowDeleteConfirm(true)
                            setSelectedProduct(product)
                           }}

              className="text-red-500 hover:text-red-600"
            >
              <FaTrash />
            </button>
            
          </td>
         }
        </tr>
      ))}
    </tbody>
  );
};

export default ProductTableBody;
