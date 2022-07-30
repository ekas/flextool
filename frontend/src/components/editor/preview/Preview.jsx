import { DRAG_TYPES } from "constants/DragTypes";
import { useComponents } from "contexts/ComponentsContext";
import { createElement, useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import ComponentName from "../elements/ComponentName";
import ComponentName2 from "../elements/ComponentName2";
import PreviewContainer from "./PreviewContainer";

import "./index.less";

const PreviewComponents = {
  ComponentName,
  ComponentName2,
};
const Preview = () => {
  const [focused, setFocused] = useState();
  const { components, setComponents } = useComponents();

  const clickHandler = useCallback(
    (index) => {
      if (focused === index) setFocused(null);
      setFocused(index);
    },
    [focused, setFocused]
  );

  const [, drop] = useDrop({
    accept: DRAG_TYPES.COMPONENT,
    drop(item, monitor) {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      console.log("item dropped!", item);
      const componentStructure = {
        name: item.id,
        props: {},
      };
      setComponents((prevValue) => [...prevValue, componentStructure]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  const componentPreview =
    components.length > 0 &&
    components.map((component, index) => {
      if (typeof PreviewComponents[component.name] !== "undefined") {
        const NewComponent = createElement(PreviewComponents[component.name], {
          // @TODO: Use a hash here?
          key: index,
          ...component.props,
        });
        return createElement(
          PreviewContainer,
          {
            kay: index,
            index,
            onClick: clickHandler,
            focused: focused === index ? true : false,
          },
          [NewComponent]
        );
      }
      return null;
    });

  return (
    <div ref={drop} className="previewContainer">
      <div className="previewContainer2">{componentPreview}</div>
    </div>
  );
};

export default Preview;
