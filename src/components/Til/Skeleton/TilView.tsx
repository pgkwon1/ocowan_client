export default function TilViewSkeleton() {
  return (
    <div className="container mx-auto p-4 max-w-4xl animate-pulse">
      <div className="mb-4">
        <div className="text-4xl bg-gray-200 rounded w-1/2 h-8"></div>
      </div>

      <div className="flex items-center mb-6 space-x-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="mt-1 h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>

      <div className="post-content mb-8">
        <div className="">
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="relative flex items-center space-x-6 border-t pt-4 mb-8">
        <div className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 cursor-pointer text-2xl">
          <div className="bg-gray-200 rounded w-8 h-8"></div>
          <div className="bg-gray-200 rounded w-8 h-8"></div>
        </div>

        <div className="flex gap-4 items-center overflow-hidden transition-all duration-300 max-w-0">
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="comments-section border-t pt-8">
        <div className="text-2xl bg-gray-200 rounded w-1/4 h-8 mb-4"></div>

        <div className="add-comment">
          <div className="text-lg bg-gray-200 rounded w-1/4 mb-2 h-6"></div>
          <div className="w-full border rounded-lg p-2 h-24 mb-4">
            <div className="bg-gray-200 rounded w-full h-full"></div>
          </div>
          <div className="px-4 py-2 bg-gray-200 rounded-lg w-24 h-8"></div>
        </div>
      </div>
    </div>
  );
}
