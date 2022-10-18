import { FC } from "react";
import { useDrag } from "react-dnd";
import { DRAG_TYPES } from "constants/DragTypes";

import "./index.less";

const DraggableAvatarBlock: FC = () => {
  const [, drag] = useDrag({
    type: DRAG_TYPES.COMPONENT,
    item: {
      name: "AvatarBlock",
      displayName: "AvatarBlock",
      props: { badgeCount: 10 },
      position: { x: 50, y: 50, width: 300, height: 80 },
    },
  });
  return (
    <div ref={drag} className="draggableComponent">
      Avatar
    </div>
  );
};

export default DraggableAvatarBlock;
