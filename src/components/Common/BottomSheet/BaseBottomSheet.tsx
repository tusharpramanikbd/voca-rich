import { memo, useEffect } from "react";
import { Sheet } from "react-modal-sheet";

type TBaseBottomSheet = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const BaseBottomSheet = ({ isOpen, onClose, children }: TBaseBottomSheet) => {
  useEffect(() => {
    console.log("BaseBottomSheet", isOpen);
  });
  return (
    <Sheet
      detent="content"
      disableScrollLocking={true}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>{children}</Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onClick={onClose} />
    </Sheet>
  );
};

export default memo(BaseBottomSheet);
