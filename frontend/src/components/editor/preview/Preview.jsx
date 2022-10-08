import { DRAG_TYPES } from "constants/DragTypes";
import { createElement, useCallback, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import PreviewContainer from "./PreviewContainer";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { PAGE_EDIT } from "queries/page.query";
import ElementSettingsDrawer from "../elementSettingsDrawer";
import { PreviewComponentsList } from "./PreviewComponentsList";

import "./index.less";

const Preview = ({
  pageData,
  pageQueryType,
  setPageQueryType,
  isPagePreviewable,
}) => {
  const [focused, setFocused] = useState();
  const [componentsData, setComponentsData] = useState([]);
  const [settingsElementId, setSettingsElementId] = useState(null);
  const [isSettingsDrawerOpen, setSettingsDrawerOpen] = useState(false);

  useEffect(() => {
    if (settingsElementId !== null) {
      setSettingsDrawerOpen(true);
    }
  }, [settingsElementId]);

  const deleteComponentHandler = (elementId) => {
    setComponentsData([
      ...componentsData.filter((component) => component.id !== elementId),
    ]);
  };

  const settingsComponentHandler = (elementId) => {
    setSettingsElementId(elementId);
  };

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
      setComponentsData([...JSON.parse(pageData.definition)]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData]);

  useEffect(() => {
    pageQueryType === "save" &&
      editPage({
        variables: { ...pageData, definition: JSON.stringify(componentsData) },
      });
    pageQueryType === "preview" &&
      editPage({ variables: { ...pageData, isPublic: true } });
    setPageQueryType(null);
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
    <>
      <div
        ref={drop}
        className="previewContainer"
        style={{
          width: isPagePreviewable ? "100%" : null,
        }}
      >
        <div className="previewContainer2">
          <ComponentPreview
            componentsData={componentsData}
            clickHandler={clickHandler}
            focused={focused}
            deleteComponentHandler={deleteComponentHandler}
            settingsComponentHandler={settingsComponentHandler}
            isPagePreviewable={isPagePreviewable}
            setComponentsData={setComponentsData}
          />
        </div>
      </div>
      {settingsElementId !== null && componentsData.length !== 0 && (
        <ElementSettingsDrawer
          componentsData={componentsData}
          settingsElementId={settingsElementId}
          setSettingsElementId={setSettingsElementId}
          isSettingsDrawerOpen={isSettingsDrawerOpen}
          setSettingsDrawerOpen={setSettingsDrawerOpen}
          setComponentsData={setComponentsData}
        />
      )}
    </>
  );
};

const ComponentPreview = ({
  componentsData,
  clickHandler,
  focused,
  deleteComponentHandler,
  settingsComponentHandler,
  isPagePreviewable,
  setComponentsData,
}) => {
  return (
    <>
      {componentsData.map((component, index) => {
        if (typeof PreviewComponentsList[component.name] !== "undefined") {
          const NewComponent = createElement(
            PreviewComponentsList[component.name],
            {
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
              deleteHandler: deleteComponentHandler,
              settingsHandler: settingsComponentHandler,
              isPagePreviewable: isPagePreviewable,
              componentsData: componentsData,
              setComponentsData: setComponentsData,
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
