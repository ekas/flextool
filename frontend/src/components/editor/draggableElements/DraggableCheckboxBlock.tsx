import { FC } from "react";
import { useDrag } from "react-dnd";
import { DRAG_TYPES } from "constants/DragTypes";

import "./index.less";

const DraggableCheckBoxBlock: FC = () => {
  const [, drag] = useDrag({
    type: DRAG_TYPES.COMPONENT,
    item: {
      name: "CheckBoxBlock",
      displayName: "CheckBoxBlock",
      props: {
        label: "Checkbox",
      },
      position: { x: 50, y: 50, width: 300, height: 40 },
    },
  });
  return (
    <div ref={drag} className="draggableComponent">
      CheckBox
    </div>
  );
};

export default DraggableCheckBoxBlock;
