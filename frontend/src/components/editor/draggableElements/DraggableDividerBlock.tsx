import { FC } from "react";
import { useDrag } from "react-dnd";
import { DRAG_TYPES } from "constants/DragTypes";

import "./index.less";

const DraggableDividerBlock: FC = () => {
  const [, drag] = useDrag({
    type: DRAG_TYPES.COMPONENT,
    item: {
      name: "DividerBlock",
      displayName: "DividerBlock",
      props: {
        orientation: "center",
        dashed: false,
        plain: false,
      },
      position: { x: 50, y: 50, width: 1000, height: 20 },
    },
  });
  return (
    <div ref={drag} className="draggableComponent">
      Divider
    </div>
  );
};

export default DraggableDividerBlock;
