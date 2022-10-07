import { FC } from "react";
import { useDrag } from "react-dnd";
import { DRAG_TYPES } from "constants/DragTypes";

import "./index.less";

interface DraggableTableProps {}

const DraggableTable: FC<DraggableTableProps> = () => {
  const [, drag] = useDrag({
    type: DRAG_TYPES.COMPONENT,
    item: {
      name: "TableBlock",
      props: {},
      position: { x: 20, y: 20, width: 320, height: 669 },
    },
  });
  return (
    <div ref={drag} className="draggableComponent">
      Table Block
    </div>
  );
};

export default DraggableTable;
