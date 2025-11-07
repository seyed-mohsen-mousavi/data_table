import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";

type Props = {
  search: string;
  setSearch: (value: string) => void;
  sortByPrice?: "asc" | "desc";
  setSortByPrice: (value: "asc" | "desc" | undefined) => void;
};

const ProductTableControls = ({
  search,
  setSearch,
  sortByPrice,
  setSortByPrice,
}: Props) => {
  const [inputText, setInputText] = useState(search);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (inputText !== search) setSearch(inputText);
    }, 400);
    return () => clearTimeout(timeout);
  }, [inputText]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearch(inputText);
    }
  };

  const toggleSort = () => {
    if (!sortByPrice) setSortByPrice("asc");
    else if (sortByPrice === "asc") setSortByPrice("desc");
    else setSortByPrice(undefined);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4">
      <input
        type="text"
        value={inputText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="جستجوی محصول..."
        className="w-full md:w-1/2 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="button"
        onClick={toggleSort}
        className="text-blue-600 hover:underline text-sm self-end md:self-auto transition"
      >
        {sortByPrice === "asc"
          ? "مرتب‌سازی: ارزان‌ترین ← گران‌ترین"
          : sortByPrice === "desc"
          ? "مرتب‌سازی: گران‌ترین ← ارزان‌ترین"
          : "مرتب‌سازی بر اساس قیمت"}
      </button>
    </div>
  );
};

export default ProductTableControls;
