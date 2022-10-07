import { DRAG_TYPES } from "constants/DragTypes";
import { useComponents } from "contexts/ComponentsContext";
import { createElement, useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import TableBlock from "../elements/TableBlock";
import ArticleBlock from "../elements/ArticleBlock";
import PreviewContainer from "./PreviewContainer";
import { v4 as uuidv4 } from "uuid";

import "./index.less";

const PreviewComponents = {
  TableBlock,
  ArticleBlock,
};

const Preview = () => {
  const [focused, setFocused] = useState();
  const { components, setComponents } = useComponents();
  /* useEffect(() => {
    console.log("components", components);
  }, [components]); */

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
        id: uuidv4(),
        name: item.name,
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
          key: component.id,
          ...component.props,
        });
        return createElement(
          PreviewContainer,
          {
            key: index,
            index,
            onClick: clickHandler,
            focused: focused === index ? true : false,
            elementId: component.id,
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
