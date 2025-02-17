export default function TilEditSkeleton() {
  return (
    <div className="flex flex-col gap-12 animate-pulse">
      <div className="flex flex-col gap-8 relative w-full">
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="block w-full p-4 h-12 rounded-lg"></div>
      </div>
      <div className="h-6 bg-gray-200 rounded w-1/5"></div>
      <div className="flex flex-wrap gap-2 relative mb-6 w-full">
        <div className="flex items-center justify-center p-4 border h-12 rounded-md w-full xs:w-[49%] sm:w-[49%] md:w-[32%]"></div>
        <div className="flex items-center justify-center p-4 border h-12 rounded-md w-full xs:w-[49%] sm:w-[49%] md:w-[32%]"></div>
        <div className="flex items-center justify-center p-4 border h-12 rounded-md w-full xs:w-[49%] sm:w-[49%] md:w-[32%]"></div>
      </div>
      <div className="h-64 bg-gray-200 rounded-lg"></div>
      <div className="h-6 bg-gray-200 rounded w-1/5"></div>
      <div className="flex align-center flex-col gap-4 relative mb-6 w-full">
        <div className="h-6 bg-gray-200 rounded w-2/3"></div>
      </div>
      <div className="flex flex-row gap-8 align-center items-center">
        <div className="p-2 border h-10 w-1/2 rounded-md"></div>
        <div className="h-10 w-1/2 p-2 border rounded-md"></div>
      </div>

      <div className="p-2 w-full h-10 border rounded-md"></div>
    </div>
  );
}
