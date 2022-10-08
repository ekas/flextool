import React, { useCallback, useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import ElementActions from "../elementActions";
import { ComponentProps, PositionProps } from "contexts/ComponentsContext";

interface PreviewContainerProps {
  index: number;
  focused: boolean;
  onClick: Function;
  children: React.ReactNode;
  elementData: ComponentProps;
  componentsData: ComponentProps[];
  isPagePreviewable: boolean;
  deleteHandler: (elementId: string) => void;
  settingsHandler: (elementId: string) => void;
  setComponentsData: Function;
}

const PreviewContainer = ({
  children,
  focused,
  index,
  onClick,
  elementData,
  deleteHandler,
  settingsHandler,
  isPagePreviewable,
  componentsData,
  setComponentsData,
}: PreviewContainerProps) => {
  const ref = useRef(null as null | HTMLDivElement);
  const [position, setPosition] = useState<PositionProps>({
    ...elementData.position,
  });
  const [hovered, setHovered] = useState(false);

  const clickHandler = useCallback(
    () => {
      onClick(index);
    },
    // eslint-disable-next-line
    [onClick]
  );

  const getComponentDimensions = useCallback(() => {
    if (ref.current)
      setPosition({
        ...position,
        height: ref.current.clientHeight,
        width: ref.current.clientWidth,
        x: ref.current.offsetLeft,
        y: ref.current.offsetTop,
      });
  }, [position]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getComponentDimensions(), []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(
    () =>
      console.log(
        "------------------componentsData------------------",
        componentsData
      ),
    [componentsData]
  );

  const setcomponentsHandler = useCallback(() => {
    const componentIndex = componentsData.findIndex(
      (component) => component.id === elementData.id
    );
    if (componentIndex !== -1) {
      componentsData[componentIndex].position = position;
      componentsData[componentIndex].displayName = elementData.displayName
        ? `${elementData.displayName}`
        : `${elementData.name} ${index + 1}`;
      setComponentsData && setComponentsData([...componentsData]);
    } else {
      const newComponent = {
        ...elementData,
        displayName: elementData.displayName
          ? `${elementData.displayName}`
          : `${elementData.name} ${index + 1}`,
      };
      setComponentsData && setComponentsData([...componentsData, newComponent]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  const deleteComponentHandler = (elementId: string) => {
    deleteHandler(elementId);
  };

  const settingsComponentHandler = (elementId: string) => {
    settingsHandler(elementId);
  };

  useEffect(() => {
    console.log("position updated", position);
    setcomponentsHandler();
  }, [position, setcomponentsHandler]);

  const { width, height } = position;
  return (
    <Rnd
      default={{
        ...position,
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setPosition({
          ...position,
          width: ref.clientWidth,
          height: ref.clientHeight,
        });
      }}
      onDragStop={(e, d) => {
        setPosition({ ...position, x: d.x, y: d.y });
      }}
      minWidth={width}
      minHeight={height && height + 20}
      bounds="window"
      onClick={!isPagePreviewable && clickHandler}
      style={{
        border: focused
          ? "1px solid var(--primary)"
          : hovered
          ? "1px solid var(--grey-background4)"
          : "1px solid var(--grey-light)",
      }}
      disableDragging={isPagePreviewable}
      className="dnd-container"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {!isPagePreviewable && (
        <ElementActions
          displayName={
            elementData.displayName ? elementData.displayName : elementData.name
          }
          onDelete={deleteComponentHandler}
          onSettings={settingsComponentHandler}
          elementId={elementData.id}
        />
      )}
      <div ref={ref}>{children}</div>
    </Rnd>
  );
};

export default PreviewContainer;
