import { FC } from "react";
import { useDrag } from "react-dnd";
import { DRAG_TYPES } from "constants/DragTypes";

import "./index.less";

const DraggableButtonBlock: FC = () => {
  const [, drag] = useDrag({
    type: DRAG_TYPES.COMPONENT,
    item: {
      name: "ButtonBlock",
      displayName: "ButtonBlock",
      props: {
        buttonLabel: "Button",
        buttonType: "primary",
      },
      position: { x: 50, y: 50, width: 300, height: 80 },
    },
  });
  return (
    <div ref={drag} className="draggableComponent">
      Button
    </div>
  );
};

export default DraggableButtonBlock;
