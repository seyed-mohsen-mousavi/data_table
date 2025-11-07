import TotalCountDisplay from "./components/TotalCountDisplay";
import PaginationControls from "./components/PaginationControls";
import PageSizeSelector from "./components/PageSizeSelector";

type Props = {
  totalCount: number;
  page: number;
  setPage: (p: number) => void;
  pageSize: number;
  setPageSize: (s: number) => void;
};

const ProductTableFooter = ({totalCount , page , setPage , setPageSize , pageSize} : Props) => {
  return (
    <tfoot>
      <tr>
        <td colSpan={5}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4">
            <TotalCountDisplay totalCount={totalCount} />
            <PaginationControls page={page} setPage={setPage} totalCount={totalCount} pageSize={pageSize} />
            <PageSizeSelector setPageSize={setPageSize} pageSize={pageSize} setPage={setPage} />
          </div>
        </td>
      </tr>
    </tfoot>
  );
};

export default ProductTableFooter;
