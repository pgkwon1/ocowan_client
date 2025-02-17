export default function TilSkeleton() {
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="animate-pulse">
        {/* Category Tabs Skeleton */}
        <div className="flex space-x-4 mb-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded"
            ></div>
          ))}
        </div>

        {/* Post Card Skeleton */}
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4"
          >
            <div className="h-5 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>

            <div className="flex space-x-2">
              {[...Array(5)].map((_, idx) => (
                <div
                  key={idx}
                  className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-full"
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
