import type { ReactNode } from "react";

type THorizontalList<T> = {
  items: T[] | undefined;
  renderItem: (item: T) => ReactNode;
  renderEmpty?: ReactNode;
  className?: string;
};

const HorizontalList = <T extends { id: string }>({
  items,
  renderItem,
  renderEmpty,
  className = "",
}: THorizontalList<T>) => {
  if (items === undefined) {
    return null;
  }

  if (items.length === 0) {
    return <div className="px-6">{renderEmpty}</div>;
  }

  return (
    <div
      className={`flex gap-3 overflow-x-auto px-4 py-2 scrollbar-hide ${className}`}
      style={{
        WebkitOverflowScrolling: "touch",
      }}
    >
      {items.map((item) => (
        <div key={item.id} className="shrink-0">
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
};

export default HorizontalList;
