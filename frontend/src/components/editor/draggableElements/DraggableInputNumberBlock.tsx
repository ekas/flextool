import { FC } from "react";
import { useDrag } from "react-dnd";
import { DRAG_TYPES } from "constants/DragTypes";

import "./index.less";

const DraggableInputNumberBlock: FC = () => {
  const [, drag] = useDrag({
    type: DRAG_TYPES.COMPONENT,
    item: {
      name: "InputNumberBlock",
      displayName: "InputNumberBlock",
      props: {
        placeholder: "InputNumber Placeholder",
        min: 2,
        max: 10,
        defaultValue: 10,
      },
      position: { x: 50, y: 50, width: 300, height: 80 },
    },
  });
  return (
    <div ref={drag} className="draggableComponent">
      Input Number
    </div>
  );
};

export default DraggableInputNumberBlock;
