export type Product = {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
};

let products: Product[] = Array.from({ length: 25 }).map((_, i) => ({
    id: String(i + 1),
    name: `محصول ${i + 1}`,
    category: ["کالای دیجیتال", "پوشاک", "غذا"][i % 3],
    price: 10000 + i * 1000,
    stock: 5 + (i % 10),
}));

type GetProductsParams = {
    page: number;
    pageSize: number;
    search?: string;
    sortByPrice?: "asc" | "desc";
};

export const productApi = {
    getProducts: async ({
        page,
        pageSize,
        search,
        sortByPrice,
    }: GetProductsParams): Promise<{
        items: Product[];
        total: number;
    }> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                let filtered = [...products];

                if (search) {
                    filtered = filtered.filter((p) =>
                        p.name.toLowerCase().includes(search.toLowerCase())
                    );
                }

                if (sortByPrice === "asc") {
                    filtered.sort((a, b) => a.price - b.price);
                } else if (sortByPrice === "desc") {
                    filtered.sort((a, b) => b.price - a.price);
                }

                const total = filtered.length;
                const start = (page - 1) * pageSize;
                const end = start + pageSize;
                const items = filtered.slice(start, end);

                resolve({ items, total });
            }, 500);
        });
    },

    addProduct: async (newProduct: Omit<Product, "id">): Promise<Product> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newEntry: Product = {
                    id: Date.now().toString(),
                    ...newProduct,
                };
                products.unshift(newEntry);
                resolve(newEntry);
            }, 500);
        });
    },

    editProduct: async (id: string, updated: Omit<Product, "id">): Promise<Product> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = products.findIndex((p) => p.id === id);
                if (index === -1) return reject("محصول پیدا نشد");

                products[index] = { id, ...updated };
                resolve(products[index]);
            }, 500);
        });
    },

    deleteProduct: async (id: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const prevLength = products.length;
                products = products.filter((p) => p.id !== id);

                if (products.length === prevLength) return reject("محصول پیدا نشد");
                resolve();
            }, 500);
        });
    },
};
