import { DRAG_TYPES } from "constants/DragTypes";
import { useDrag } from "react-dnd";

interface DraggableComponent2Props {}

const DraggableComponent2 = ({}: DraggableComponent2Props) => {
  const [, drag] = useDrag({
    type: DRAG_TYPES.COMPONENT,
    item: { id: "ComponentName2", props: {} },
  });
  return (
    <div ref={drag} className="draggableComponent">
      Component Name 2
    </div>
  );
};

export default DraggableComponent2;
