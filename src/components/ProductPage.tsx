import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductTable from "./components/productTable/ProductTable";
import ProductPageHeader from "./components/ProductPageHeader";
import AddProductModal from "./components/AddProductModal";
import EditProductModal from "./components/productTable/components/ProductTableBody/modals/EditProductModal";
import DeleteProductDialog from "./components/productTable/components/ProductTableBody/modals/DeleteProductDialog";
import { useAuth } from "../stores/AuthContext";
import type { Product } from "../api/productApi";
import { useProducts } from "./components/productTable/hooks/useProducts";

const ProductPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const {
    products,
    totalCount,
    page,
    setPage,
    pageSize,
    setPageSize,
    search,
    setSearch,
    sortByPrice,
    setSortByPrice,
    loading,
    refetch,
  } = useProducts();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div
      data-testid="product-page"
      className="min-h-screen bg-gray-100 p-6 font-sans"
    >
      {showAddModal && (
        <AddProductModal
          showAddModal={showAddModal}
          setShowAddModal={setShowAddModal}
          refetchProducts={refetch}
        />
      )}
      {showEditModal && (
        <EditProductModal
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          product={selectedProduct}
          refetchProducts={refetch}
        />
      )}
      {showDeleteConfirm && (
        <DeleteProductDialog
          showDeleteConfirm={showDeleteConfirm}
          setShowDeleteConfirm={setShowDeleteConfirm}
          product={selectedProduct}
          refetchProducts={refetch}
        />
      )}

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-6 space-y-6">
        <ProductPageHeader setShowAddModal={setShowAddModal} />

        <ProductTable
          loading={loading}
          totalCount={totalCount}
          products={products}
          setPage={setPage}
          setPageSize={setPageSize}
          setSearch={setSearch}
          setSortByPrice={setSortByPrice}
          search={search}
          page={page}
          sortByPrice={sortByPrice}
          pageSize={pageSize}
          setSelectedProduct={setSelectedProduct}
          setShowDeleteConfirm={setShowDeleteConfirm}
          setShowEditModal={setShowEditModal}
        />

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
