import { FC } from "react";
import { useDrag } from "react-dnd";
import { DRAG_TYPES } from "constants/DragTypes";

import "./index.less";

const DraggablePageHeaderBlock: FC = () => {
  const [, drag] = useDrag({
    type: DRAG_TYPES.COMPONENT,
    item: {
      name: "PageHeaderBlock",
      displayName: "PageHeaderBlock",
      props: {
        title: "Title",
        subTitle: "This is a subtitle",
      },
      position: { x: 50, y: 50, width: 1000, height: 80 },
    },
  });
  return (
    <div ref={drag} className="draggableComponent">
      Page Header
    </div>
  );
};

export default DraggablePageHeaderBlock;
