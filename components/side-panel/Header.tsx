import useTaskStore from "@/store/task.store";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

interface Props {}

const SidePanelHeader = ({}: Props) => {
  const resetTask = useTaskStore((state) => state.resetTask);

  const onClickRightArrow = () => {
    resetTask();
  };

  return (
    <div className="w-full">
      <MdKeyboardDoubleArrowRight
        onClick={onClickRightArrow}
        className="text-neutral-500 cursor-pointer"
        size={23}
      />
    </div>
  );
};

export default SidePanelHeader;
