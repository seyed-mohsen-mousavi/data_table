import { useAuth } from "../../../../../stores/AuthContext";
import ProductTableControls from "./components/ProductTableControls";

type Props = {
  search: string;
  setSearch: (value: string) => void;
  sortByPrice?: "asc" | "desc";
  setSortByPrice: (value: "asc" | "desc" | undefined) => void;
};

const ProductTableHeader = ({search , setSearch , sortByPrice , setSortByPrice}: Props) => {
  const {role} = useAuth()
  return (
    <thead className="bg-gray-100 text-gray-800">
      <tr>
        <td colSpan={5}>
          <ProductTableControls sortByPrice={sortByPrice} setSortByPrice={setSortByPrice} search={search}  setSearch={setSearch}  />
        </td>
      </tr>
      <tr>
        {/* ستون ها را در قالب زیر بسازید */}
        <th className="px-4 py-3">نام محصول </th>
        <th className="px-4 py-3">دسته‌بندی</th>
        <th className="px-4 py-3">قیمت</th>
        <th className="px-4 py-3">موجودی</th>
        {role === "admin" && <th className="px-4 py-3">عملیات</th>}
      </tr>
    </thead>
  );
};

export default ProductTableHeader;
