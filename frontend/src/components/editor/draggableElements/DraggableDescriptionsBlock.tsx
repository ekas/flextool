import { FC } from "react";
import { useDrag } from "react-dnd";
import { DRAG_TYPES } from "constants/DragTypes";

import "./index.less";

const DraggableDescriptionBlock: FC = () => {
  const [, drag] = useDrag({
    type: DRAG_TYPES.COMPONENT,
    item: {
      name: "DescriptionBlock",
      displayName: "DescriptionBlock",
      props: {
        title: "User Data",
        descriptions: [
          {
            label: "UserName",
            content: "Zhou Maomao",
          },
          {
            label: "Telephone",
            content: "1810000000",
          },
          {
            label: "Live",
            content: "Hangzhou, Zhejiang",
          },
          {
            label: "Remark",
            content: "empty",
          },
          {
            label: "Address",
            content:
              "No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China",
          },
        ],
      },
      position: { x: 50, y: 50, width: 400, height: 150 },
    },
  });
  return (
    <div ref={drag} className="draggableComponent">
      Description
    </div>
  );
};

export default DraggableDescriptionBlock;
