import { FC } from "react";
import { useDrag } from "react-dnd";
import { DRAG_TYPES } from "constants/DragTypes";

import "./index.less";

const DraggableFormBlock: FC = () => {
  const [, drag] = useDrag({
    type: DRAG_TYPES.COMPONENT,
    item: {
      name: "FormBlock",
      displayName: "FormBlock",
      props: { fieldAName: "Email", fieldBName: "Password" },
      position: { x: 50, y: 50, width: 500, height: 300 },
    },
  });
  return (
    <div ref={drag} className="draggableComponent">
      Login Form
    </div>
  );
};

export default DraggableFormBlock;
