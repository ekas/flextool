import { FC } from "react";
import { useDrag } from "react-dnd";
import { DRAG_TYPES } from "constants/DragTypes";

import "./index.less";

const DraggableCarouselBlock: FC = () => {
  const [, drag] = useDrag({
    type: DRAG_TYPES.COMPONENT,
    item: {
      name: "CarouselBlock",
      displayName: "CarouselBlock",
      props: {
        carouselItems: ["Slide 1", "Slide 2", "Slide 3"],
      },
      position: { x: 50, y: 50, width: 400, height: 150 },
    },
  });
  return (
    <div ref={drag} className="draggableComponent">
      Carousel
    </div>
  );
};

export default DraggableCarouselBlock;
