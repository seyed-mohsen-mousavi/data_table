import ProductTableBody from "./components/ProductTableBody/ProductTableBody";
import ProductTableFooter from "./components/ProductTableFooter/ProductTableFooter";
import ProductTableHeader from "./components/ProductTableHeader/ProductTableHeader";
import type { Product } from "../../../api/productApi";

type Props = {
  setShowEditModal: (value: boolean) => void;
  setShowDeleteConfirm: (value: boolean) => void;
  onRefetch?: (refetch: () => void) => void;
  setSelectedProduct : (value : Product) => void;
  products : Product[];
  totalCount: number;
  page : number;
  setPage : (p: number) => void;
  pageSize : number;
  setPageSize : (value : number)=> void;
  search : string;
  setSearch :(value : string)=> void;
  sortByPrice?: "asc" | "desc" | undefined
  setSortByPrice :(value: "asc" | "desc" | undefined) => void
  loading :boolean
};

const ProductTable = ({setShowEditModal , setShowDeleteConfirm ,setSelectedProduct ,search , setSearch , sortByPrice , setSortByPrice , products , loading , page , pageSize , setPage ,setPageSize ,totalCount} : Props) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="min-w-full text-right text-sm text-gray-700">
        <ProductTableHeader search={search} setSearch={setSearch} sortByPrice={sortByPrice} setSortByPrice={setSortByPrice}  />

        <ProductTableBody setShowDeleteConfirm={setShowDeleteConfirm} setShowEditModal={setShowEditModal} products={products} loading={loading} setSelectedProduct={setSelectedProduct} />

        <ProductTableFooter totalCount={totalCount} setPage={setPage} setPageSize={setPageSize} pageSize={pageSize} page={page} />
      </table>
    </div>
  );
};

export default ProductTable;
