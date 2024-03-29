import { FC } from "react";
import { useDrag } from "react-dnd";
import { DRAG_TYPES } from "constants/DragTypes";

import "./index.less";

const DraggableBreadCrumbsBlock: FC = () => {
  const [, drag] = useDrag({
    type: DRAG_TYPES.COMPONENT,
    item: {
      name: "BreadCrumbsBlock",
      displayName: "BreadCrumbsBlock",
      props: {},
      position: { x: 50, y: 50, width: 1000, height: 40 },
    },
  });
  return (
    <div ref={drag} className="draggableComponent">
      Bread Crumbs
    </div>
  );
};

export default DraggableBreadCrumbsBlock;
