import { type ReactNode } from "react";

type TBaseList<T> = {
  items: T[];
  renderEmpty: ReactNode;
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  bottomPadding?: number;
};

const BaseList = <T,>({
  items,
  renderEmpty,
  renderItem,
  className = "",
  bottomPadding = 4,
}: TBaseList<T>) => {
  return (
    <div className={`flex-1 overflow-hidden ${className}`}>
      {items.length === 0 ? (
        <div className="h-full flex items-center justify-center px-6">
          {renderEmpty}
        </div>
      ) : (
        <div
          className="h-full overflow-y-auto px-6 space-y-4"
          style={{ paddingBottom: `${bottomPadding}rem` }}
        >
          {items.map((item, index) => renderItem(item, index))}
        </div>
      )}
    </div>
  );
};

export default BaseList;
