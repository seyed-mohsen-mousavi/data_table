import { useEffect, useState, useCallback } from "react";
import { productApi } from "../../../../api/productApi";
import type { Product } from "../../../../api/productApi";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState("");
  const [sortByPrice, setSortByPrice] = useState<"asc" | "desc" | undefined>("asc");
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await productApi.getProducts({
        page,
        pageSize,
        search,
        sortByPrice,
      });
      setProducts(response.items);
      setTotalCount(response.total);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, search, sortByPrice]);

  const refetch = useCallback(async () => {
    await fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
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
    fetchProducts,
    refetch,
  };
};
