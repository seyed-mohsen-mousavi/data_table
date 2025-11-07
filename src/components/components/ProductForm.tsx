import { useState, useEffect } from "react";
import { productApi } from "../../api/productApi";
import { useProducts } from "./productTable/hooks/useProducts";

type ProductFormProps = {
  onSuccess: () => void;
  initialValues?: {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
  } | null;
};

const ProductForm = ({ onSuccess, initialValues }: ProductFormProps) => {
  const { fetchProducts } = useProducts(); 
  const [name, setName] = useState(initialValues?.name || "");
  const [category, setCategory] = useState(initialValues?.category || "");
  const [price, setPrice] = useState(initialValues?.price || 0);
  const [stock, setStock] = useState(initialValues?.stock || 0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name);
      setCategory(initialValues.category);
      setPrice(initialValues.price);
      setStock(initialValues.stock);
    } else {
      setName("");
      setCategory("");
      setPrice(0);
      setStock(0);
    }
  }, [initialValues]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !category || price === null || stock === null) {
      setError("لطفا همه فیلدها را پر کنید.");
      return;
    }

    setLoading(true);
    setError("");

    const productData = {
      name,
      category,
      price,
      stock,
    };

    try {
      if (initialValues?.id) {
        await productApi.editProduct(initialValues.id, productData);
      } else {
        await productApi.addProduct(productData);
      }

      onSuccess();
      await fetchProducts(); 

    } catch (error) {
      console.error(error);
      setError("خطا در ذخیره‌سازی محصول.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div>
        <label className="block text-sm text-gray-700 mb-1">نام محصول</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-1">دسته‌بندی</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">انتخاب دسته‌بندی</option>
          <option value="الکترونیک">الکترونیک</option>
          <option value="پوشاک">پوشاک</option>
          <option value="کتاب">کتاب</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-1">قیمت</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-1">موجودی</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
        >
          {loading
            ? "در حال ذخیره..."
            : initialValues?.id
            ? "ویرایش محصول"
            : "افزودن محصول"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
