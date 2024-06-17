"use client";

import { useCallback, useState } from "react";
import SlidingPanel from "react-sliding-side-panel";
import "react-sliding-side-panel/lib/index.css";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

interface Props {}

const SidePanel = (props: Props) => {
  const [isOpened, setIsOpened] = useState(true);

  const onClickRightArrow = useCallback(() => {
    setIsOpened(false);
  }, []);

  return (
    <SlidingPanel
      type="right"
      isOpen={isOpened}
      size={30}
      panelClassName="bg-task-list/50 h-full"
      panelContainerClassName="bg-task-list/50 z-50"
    >
      <div>
        <div className="w-full p-2">
          <MdKeyboardDoubleArrowRight
            onClick={onClickRightArrow}
            className="text-neutral-500 cursor-pointer"
            size={23}
          />
        </div>
      </div>
    </SlidingPanel>
  );
};

export default SidePanel;
