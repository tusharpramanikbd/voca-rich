import { type ReactNode } from "react";
import { Virtuoso } from "react-virtuoso";
import LoadingSkeleton from "./LoadingSkeleton";

type TBaseList<T> = {
  items: T[] | undefined;
  renderEmpty: ReactNode;
  renderItem: (item: T) => ReactNode;
  className?: string;
  bottomPadding?: number;
};

const BaseList = <T extends { id: string }>({
  items,
  renderEmpty,
  renderItem,
  className = "",
  bottomPadding = 88,
}: TBaseList<T>) => {
  // Loading
  if (items === undefined) {
    return <LoadingSkeleton className={className} />;
  }

  // Empty state
  if (items.length === 0) {
    return (
      <div
        className={`flex-1 flex items-center justify-center px-6 ${className}`}
      >
        {renderEmpty}
      </div>
    );
  }

  return (
    <div className={`flex-1 ${className}`}>
      <Virtuoso<T>
        data={items}
        style={{ height: "100%" }}
        overscan={200}
        computeItemKey={(_, item) => item.id}
        itemContent={(_, item) => (
          <div className="px-6 py-2">{renderItem(item)}</div>
        )}
        components={{
          Footer: () => <div style={{ height: bottomPadding }} />,
        }}
      />
    </div>
  );
};

export default BaseList;
