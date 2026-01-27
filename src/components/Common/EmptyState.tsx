type TEmptyState = {
  emptyType: "module" | "word";
};

const EmptyState = ({ emptyType }: TEmptyState) => {
  return (
    <div className="text-center py-12 text-gray-500">
      <p className="text-lg">No {emptyType} yet</p>
      <p className="text-sm mt-2">Create your first {emptyType}</p>
    </div>
  );
};
export default EmptyState;
