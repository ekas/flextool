import { FC } from "react";
import { useDrag } from "react-dnd";
import { DRAG_TYPES } from "constants/DragTypes";

import "./index.less";
import { Avatar } from "antd";

const DraggableCardBlock: FC = () => {
  const [, drag] = useDrag({
    type: DRAG_TYPES.COMPONENT,
    item: {
      name: "CardBlock",
      displayName: "CardBlock",
      props: {
        cardTitle: "Card Title",
        cardDescription: "Card Description",
        cardAvatar: <Avatar src="https://joeschmoe.io/api/v1/random" />,
        loading: true,
      },
      position: { x: 50, y: 50, width: 310, height: 300 },
    },
  });
  return (
    <div ref={drag} className="draggableComponent">
      Card
    </div>
  );
};

export default DraggableCardBlock;
