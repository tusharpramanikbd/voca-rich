type TLoadingSkeleton = {
  skeletonCount?: number;
  className?: string;
};

const SkeletonItem = () => (
  <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="flex-1 space-y-2">
        <div className="h-8 w-4/5 bg-gray-200 rounded-lg mb-2" />
        <div className="h-6 w-3/4 bg-gray-200 rounded-lg" />
      </div>
      <div className="w-10 h-10 bg-gray-200 rounded-xl ml-4" />
    </div>
  </div>
);

const LoadingSkeleton = ({
  skeletonCount = 5,
  className = "",
}: TLoadingSkeleton) => {
  return (
    <div className={`flex-1 overflow-hidden ${className}`}>
      <div className="h-full overflow-y-auto px-6 space-y-4 pb-16">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <SkeletonItem key={i} />
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
