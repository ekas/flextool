import { FC } from "react";
import { useDrag } from "react-dnd";
import { DRAG_TYPES } from "constants/DragTypes";

import "./index.less";

const DraggableEmptyBlock: FC = () => {
  const [, drag] = useDrag({
    type: DRAG_TYPES.COMPONENT,
    item: {
      name: "EmptyBlock",
      displayName: "EmptyBlock",
      props: {},
      position: { x: 50, y: 50, width: 1000, height: 80 },
    },
  });
  return (
    <div ref={drag} className="draggableComponent">
      Empty Block
    </div>
  );
};

export default DraggableEmptyBlock;
