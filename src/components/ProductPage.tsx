import { useState } from "react";
import ProductTable from "./components/productTable/ProductTable";
import ProductPageHeader from "./components/ProductPageHeader";
import AddProductModal from "./components/AddProductModal";
import EditProductModal from "./components/productTable/components/ProductTableBody/modals/EditProductModal";
import DeleteProductDialog from "./components/productTable/components/ProductTableBody/modals/DeleteProductDialog";
import { useAuth } from "../stores/AuthContext";
import type { Product } from "../api/productApi";
import { useProducts } from "./components/productTable/hooks/useProducts";

const ProductPage = () => {
  // استیت‌های مورد نیاز برای کنترل باز و بسته کردم مودال‌ها و دیالوگ تعریف کنید
  // xseyed : به روی چشم 
  const { logout } = useAuth();
  const [showAddModal,setShowAddModal] = useState(false)
  const [showEditModal,setShowEditModal] = useState(false)
  const [showDeleteConfirm,setShowDeleteConfirm] = useState(false)
  const handleLogout = async () => {
    await logout();
  };
  const { products , page,pageSize,search , sortByPrice , setPage , setPageSize , setSearch ,setSortByPrice , loading,  refetch , totalCount } = useProducts();
  const [selectedProduct , setSelectedProduct] = useState<Product | null>(null)
  return (
    <div
      data-testid="product-page"
      className="min-h-screen bg-gray-100 p-6 font-sans"
    >
      <AddProductModal showAddModal={showAddModal} setShowAddModal={setShowAddModal} refetchProducts={refetch} />

      <EditProductModal showEditModal={showEditModal} setShowEditModal={setShowEditModal} product={selectedProduct} refetchProducts={refetch} />

      <DeleteProductDialog showDeleteConfirm={showDeleteConfirm} setShowDeleteConfirm={setShowDeleteConfirm} product={selectedProduct} refetchProducts={refetch} />

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-6 space-y-6">
        <ProductPageHeader setShowAddModal={setShowAddModal} />

        <ProductTable loading={loading} totalCount={totalCount} products={products} setPage={setPage} setPageSize={setPageSize} setSearch={setSearch} setSortByPrice={setSortByPrice} search={search} page={page} sortByPrice={sortByPrice} pageSize={pageSize} setSelectedProduct={setSelectedProduct} setShowDeleteConfirm={setShowDeleteConfirm} setShowEditModal={setShowEditModal}  />

        <button
          onClick={handleLogout}
          className="absolute bottom-5 right-5 bg-red-600 text-white cursor-pointer p-3.5 rounded-3xl"
        >
          خروج
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
