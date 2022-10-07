import { DRAG_TYPES } from "constants/DragTypes";
import { createElement, useCallback, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import TableBlock from "../elements/TableBlock";
import ArticleBlock from "../elements/ArticleBlock";
import PreviewContainer from "./PreviewContainer";
import { v4 as uuidv4 } from "uuid";
import { useComponents } from "contexts/ComponentsContext";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { PAGE_EDIT } from "queries/page.query";

import "./index.less";

const PreviewComponents = {
  TableBlock,
  ArticleBlock,
};

const Preview = ({ pageData, pageQueryType, setPageQueryType }) => {
  const [focused, setFocused] = useState();
  const { components, setComponents } = useComponents();
  const [componentsData, setComponentsData] = useState([...components]);

  const [editPage] = useMutation(PAGE_EDIT, {
    onCompleted: (QueryData) => {
      setPageQueryType(null);
      toast.success(`${QueryData.editPage.name} Saved`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (pageData) {
      setComponents([...JSON.parse(pageData.definition)]);
      setComponentsData([...JSON.parse(pageData.definition)]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData]);

  useEffect(() => {
    pageQueryType === "save" &&
      editPage({
        variables: { ...pageData, definition: JSON.stringify(components) },
      });
    pageQueryType === "preview" &&
      editPage({ variables: { ...pageData, isPublic: true } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageQueryType]);

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
      const componentStructure = {
        id: uuidv4(),
        name: item.name,
        displayName: item.displayName,
        props: item.props,
        position: item.position,
      };
      setComponentsData((prevValue) => [...prevValue, componentStructure]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  return (
    <div ref={drop} className="previewContainer">
      <div className="previewContainer2">
        <ComponentPreview
          components={componentsData}
          clickHandler={clickHandler}
          focused={focused}
        />
      </div>
    </div>
  );
};

const ComponentPreview = ({ components, clickHandler, focused }) => {
  return (
    <>
      {components.map((component, index) => {
        if (typeof PreviewComponents[component.name] !== "undefined") {
          const NewComponent = createElement(
            PreviewComponents[component.name],
            {
              // @TODO: Use a hash here?
              key: component.id,
              ...component.props,
            }
          );
          return createElement(
            PreviewContainer,
            {
              key: index,
              index,
              onClick: clickHandler,
              focused: focused === index ? true : false,
              elementData: component,
            },
            [NewComponent]
          );
        }
        return null;
      })}
    </>
  );
};

export default Preview;
