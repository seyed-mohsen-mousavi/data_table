type Props = {
  page : number;
  totalCount : number;
  pageSize :number;
  setPage: (value : number)=> void;
}
const PaginationControls = ({page ,totalCount , pageSize , setPage}  : Props) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const incPage =()=> {
    if(page === totalPages) return;
    setPage(page + 1)
  }
  const DecPage = ()=> {
    if(page === 1) return
    setPage(page - 1)
  }
  return (
    <div className="flex items-center gap-4">
      <button
        aria-label="Previous Page"
        onClick={DecPage}
        disabled={page === 1}
        className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        {"<"}
      </button>

      <span className="text-sm text-gray-700">صفحه {page}</span>

      <button
        aria-label="Next Page"
        onClick={incPage}
        disabled={page === totalPages}
        className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        {">"}
      </button>

    </div>
  );
};

export default PaginationControls;
