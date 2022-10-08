import { FC } from "react";
import { useDrag } from "react-dnd";
import { DRAG_TYPES } from "constants/DragTypes";

import "./index.less";

const DraggableArticleBlock: FC = () => {
  const [, drag] = useDrag({
    type: DRAG_TYPES.COMPONENT,
    item: {
      name: "ArticleBlock",
      displayName: "ArticleBlock",
      props: {
        name: "bokuweb",
        username: "bokuweb17",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.",
      },
      position: { x: 50, y: 50, width: 320, height: 246 },
    },
  });
  return (
    <div ref={drag} className="draggableComponent">
      Article
    </div>
  );
};

export default DraggableArticleBlock;
