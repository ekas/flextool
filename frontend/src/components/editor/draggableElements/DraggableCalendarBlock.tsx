import { FC } from "react";
import { useDrag } from "react-dnd";
import { DRAG_TYPES } from "constants/DragTypes";

import "./index.less";

const DraggableCalendarBlock: FC = () => {
  const [, drag] = useDrag({
    type: DRAG_TYPES.COMPONENT,
    item: {
      name: "CalendarBlock",
      displayName: "CalendarBlock",
      props: {
        mode: "month",
      },
      position: { x: 50, y: 50, width: 1000, height: 80 },
    },
  });
  return (
    <div ref={drag} className="draggableComponent">
      Calendar
    </div>
  );
};

export default DraggableCalendarBlock;
