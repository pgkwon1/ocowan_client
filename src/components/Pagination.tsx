import Pagination from "react-js-pagination";

interface IPaginate {
  page: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}
export default function Paginate({
  page,
  totalCount,
  onPageChange,
}: IPaginate) {
  return (
    <>
      <Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={totalCount}
        pageRangeDisplayed={5}
        onChange={onPageChange}
        itemClass="px-3 py-1"
        linkClass="hover:bg-gray-200 text-white-700"
        activeClass="bg-blue-600 text-white"
        activeLinkClass="hover:bg-blue-600"
        disabledClass="opacity-50 cursor-not-allowed"
        innerClass="flex justify-center space-x-2 mt-4"
        nextPageText={">"}
        prevPageText={"<"}
      />
    </>
  );
}
