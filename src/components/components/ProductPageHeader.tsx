import { FaPlus } from "react-icons/fa";
import { useAuth } from "../../stores/AuthContext";

type Props = {
  setShowAddModal: (value: boolean) => void;
};

const ProductPageHeader = ({setShowAddModal} : Props) => {
  const {role} = useAuth()
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-gray-800">مدیریت محصولات</h1>
      {/* بر اساس رول کاربر دکمه را به فرمت زیر نمایش بدهید */}
      {role === "admin" && <button
      onClick={()=> setShowAddModal(true)}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
      >
        <FaPlus />
        <span>افزودن محصول</span>
      </button> }
    </div>
  );
};

export default ProductPageHeader;
