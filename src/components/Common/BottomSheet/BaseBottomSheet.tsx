import { Sheet } from "react-modal-sheet";

type TBaseBottomSheet = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const BaseBottomSheet = ({ isOpen, onClose, children }: TBaseBottomSheet) => {
  return (
    <Sheet detent="content" isOpen={isOpen} onClose={onClose}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>{children}</Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

export default BaseBottomSheet;
