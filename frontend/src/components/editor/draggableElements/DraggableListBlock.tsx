import { FC } from "react";
import { useDrag } from "react-dnd";
import { DRAG_TYPES } from "constants/DragTypes";

import "./index.less";

const DraggableListBlock: FC = () => {
  const [, drag] = useDrag({
    type: DRAG_TYPES.COMPONENT,
    item: {
      name: "ListBlock",
      displayName: "ListBlock",
      props: {},
      position: { x: 50, y: 50, width: 400, height: 80 },
    },
  });
  return (
    <div ref={drag} className="draggableComponent">
      List
    </div>
  );
};

export default DraggableListBlock;
