import { FC } from "react";
import { useDrag } from "react-dnd";
import { DRAG_TYPES } from "constants/DragTypes";

import "./index.less";

interface DraggableArticleBlockProps {}

const DraggableArticleBlock: FC<DraggableArticleBlockProps> = () => {
  const [, drag] = useDrag({
    type: DRAG_TYPES.COMPONENT,
    item: {
      name: "ArticleBlock",
      displayName: "ArticleBlock",
      props: {},
      position: { x: 50, y: 50, width: 320, height: 246 },
    },
  });
  return (
    <div ref={drag} className="draggableComponent">
      Article Block
    </div>
  );
};

export default DraggableArticleBlock;
