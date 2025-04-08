export default function ProfileSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="bg-gray-200 h-32 overflow-hidden shadow-lg"></div>
      <div className="flex justify-center px-5 h-32 mt-5">
        <div className="h-32 w-32 bg-gray-200 rounded-full p-2"></div>
      </div>
      <div className="py-8">
        <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto my-1"></div>
        <div className="h-4 bg-gray-200 rounded w-3/5 mx-auto my-1"></div>
        <div className="h-10 bg-gray-200 rounded w-4/5 mx-auto my-1"></div>
      </div>
      <div className="h-0.5 bg-gray-200 rounded w-full mt-6 mb-2"></div>
      <div className="flex bg-gray-50">
        <div className="h-10 bg-gray-200 w-1/2 mx-auto my-4"></div>
        <div className="border"></div>
        <div className="h-10 bg-gray-200 w-1/2 mx-auto my-4"></div>
      </div>
    </div>
  );
}
