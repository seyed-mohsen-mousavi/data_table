type Props = {
  setPageSize: (value: number) => void;
  pageSize: number;
};

const PageSizeSelector = ({ pageSize, setPageSize }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="pageSize" className="text-sm text-gray-600">
        تعداد آیتم در هر صفحه:
      </label>
      <select
        id="pageSize"
        value={pageSize}
        onChange={handleChange}
        className="rounded-xl border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value={5}>۵</option>
        <option value={10}>۱۰</option>
        <option value={15}>۱۵</option>
      </select>
    </div>
  );
};

export default PageSizeSelector;
