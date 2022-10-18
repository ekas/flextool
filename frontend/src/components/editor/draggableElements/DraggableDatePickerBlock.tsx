import { FC } from "react";
import { useDrag } from "react-dnd";
import { DRAG_TYPES } from "constants/DragTypes";

import "./index.less";

const DraggableDatePickerBlock: FC = () => {
  const [, drag] = useDrag({
    type: DRAG_TYPES.COMPONENT,
    item: {
      name: "DateTimePicker",
      displayName: "DateTimePicker",
      props: {},
      position: { x: 50, y: 50, width: 300, height: 80 },
    },
  });
  return (
    <div ref={drag} className="draggableComponent">
      Switchable Date Time Picker
    </div>
  );
};

export default DraggableDatePickerBlock;
