import { FC } from "react";
import { useDrag } from "react-dnd";
import { DRAG_TYPES } from "constants/DragTypes";

import "./index.less";

interface DraggableArticleBlockProps {}

const DraggableArticleBlock: FC<DraggableArticleBlockProps> = () => {
  const [, drag] = useDrag({
    type: DRAG_TYPES.COMPONENT,
    item: { name: "ArticleBlock", props: {} },
  });
  return (
    <div ref={drag} className="draggableComponent">
      Article Block
    </div>
  );
};

export default DraggableArticleBlock;
