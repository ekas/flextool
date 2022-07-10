import { DRAG_TYPES } from "constants/DragTypes";
import { useDrag } from "react-dnd";

import "./index.less";

const DraggableComponent = () => {
  const [, drag] = useDrag({
    type: DRAG_TYPES.COMPONENT,
    item: { id: "ComponentName", props: {} },
  });
  return (
    <div ref={drag} className="draggableComponent">
      Component Name
    </div>
  );
};

export default DraggableComponent;
