import { FC } from "react";
import { useDrag } from "react-dnd";
import { DRAG_TYPES } from "constants/DragTypes";

import "./index.less";

const DraggableInputBlock: FC = () => {
  const [, drag] = useDrag({
    type: DRAG_TYPES.COMPONENT,
    item: {
      name: "InputBlock",
      displayName: "InputBlock",
      props: {
        placeholder: "Input Placeholder",
      },
      position: { x: 50, y: 50, width: 300, height: 80 },
    },
  });
  return (
    <div ref={drag} className="draggableComponent">
      Input
    </div>
  );
};

export default DraggableInputBlock;
