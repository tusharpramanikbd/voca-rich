import BaseBottomSheet from "../Common/BottomSheet/BaseBottomSheet";

type Props = {
  isOpen: boolean;
  onContinue: () => void;
  onLeave: () => void;
};

const LeaveChallengeSheet = ({ isOpen, onContinue, onLeave }: Props) => {
  return (
    <BaseBottomSheet isOpen={isOpen} onClose={onContinue}>
      <div className="px-6 pb-8 pt-4 text-center space-y-6">
        <div className="text-xl font-semibold text-gray-900">
          Leave challenge?
        </div>

        <div className="text-gray-600">
          You will lose your current progress and score.
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={onLeave}
            className="w-full py-4 rounded-2xl bg-red-500 text-white font-semibold shadow"
          >
            Go to Words
          </button>

          <button
            onClick={onContinue}
            className="w-full py-4 rounded-2xl bg-gray-200 text-gray-800 font-semibold"
          >
            Continue Challenge
          </button>
        </div>
      </div>
    </BaseBottomSheet>
  );
};

export default LeaveChallengeSheet;
