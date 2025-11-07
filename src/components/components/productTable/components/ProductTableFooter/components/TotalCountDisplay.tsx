type Props ={
  totalCount : number;
}
const TotalCountDisplay = ({totalCount} : Props) => {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <span>تعداد کل: </span>
      <span className="font-semibold">{totalCount}</span>
    </div>
  );
};

export default TotalCountDisplay;
