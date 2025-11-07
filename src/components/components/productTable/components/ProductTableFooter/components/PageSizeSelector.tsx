type Props = {
  setPageSize: (value: number) => void;
  pageSize: number;
  setPage?: (value: number) => void;
};

const PageSizeSelector = ({ pageSize, setPageSize, setPage }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(e.target.value);
    setPageSize(newSize);
    if (setPage) setPage(1); 
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="pageSize" className="text-sm text-gray-600">
        تعداد آیتم در هر صفحه:
      </label>
      <select
        id="pageSize"
        data-testid="page-size-selector"
        value={pageSize}
        onChange={handleChange}
        className="rounded-xl border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
      </select>
    </div>
  );
};

export default PageSizeSelector;
