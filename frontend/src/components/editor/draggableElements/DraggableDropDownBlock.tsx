import { FC } from "react";
import { useDrag } from "react-dnd";
import { DRAG_TYPES } from "constants/DragTypes";

import "./index.less";

const DraggableDropDownBlock: FC = () => {
  const [, drag] = useDrag({
    type: DRAG_TYPES.COMPONENT,
    item: {
      name: "DropDownBlock",
      displayName: "DropDownBlock",
      props: { label: "Custom Label", placement: "bottomLeft" },
      position: { x: 50, y: 50, width: 300, height: 50 },
    },
  });
  return (
    <div ref={drag} className="draggableComponent">
      Drop Down
    </div>
  );
};

export default DraggableDropDownBlock;
