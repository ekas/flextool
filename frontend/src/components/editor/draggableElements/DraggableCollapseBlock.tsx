import { FC } from "react";
import { useDrag } from "react-dnd";
import { DRAG_TYPES } from "constants/DragTypes";

import "./index.less";

const DraggableCollapseBlock: FC = () => {
  const [, drag] = useDrag({
    type: DRAG_TYPES.COMPONENT,
    item: {
      name: "CollapseBlock",
      displayName: "CollapseBlock",
      props: {
        data: [
          {
            panelHeading: "Panel Heading 1",
            panelDescription: "Panel Description 1",
          },
          {
            panelHeading: "Panel Heading 2",
            panelDescription: "Panel Description 2",
          },
          {
            panelHeading: "Panel Heading 3",
            panelDescription: "Panel Description 3",
          },
        ],
      },
      position: { x: 50, y: 50, width: 500, height: 300 },
    },
  });
  return (
    <div ref={drag} className="draggableComponent">
      Collapse
    </div>
  );
};

export default DraggableCollapseBlock;
