import { FC } from "react";
import { useDrag } from "react-dnd";
import { DRAG_TYPES } from "constants/DragTypes";

import "./index.less";

const DraggableStepsBlock: FC = () => {
  const [, drag] = useDrag({
    type: DRAG_TYPES.COMPONENT,
    item: {
      name: "StepsBlock",
      displayName: "StepsBlock",
      props: {
        stepsData: [
          {
            title: "Step 1",
            description: "Step 1 description",
            subTitle: "Step 1 subtitle",
          },
          { title: "Step 2", description: "Step 2 description" },
          { title: "Step 3", description: "Step 3 description" },
        ],
      },
      position: { x: 50, y: 50, width: 1000, height: 80 },
    },
  });
  return (
    <div ref={drag} className="draggableComponent">
      Steps
    </div>
  );
};

export default DraggableStepsBlock;
