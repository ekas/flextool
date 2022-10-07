import React, { useCallback, useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import ElementActions from "../elementActions";
import {
  ComponentProps,
  PositionProps,
  useComponents,
} from "contexts/ComponentsContext";

interface PreviewContainerProps {
  index: number;
  focused: boolean;
  onClick: Function;
  children: React.ReactNode;
  elementData: ComponentProps;
}

const PreviewContainer = ({
  children,
  focused,
  index,
  onClick,
  elementData,
}: PreviewContainerProps) => {
  // console.log("PreviewContainer", elementData);
  const ref = useRef(null as null | HTMLDivElement);
  const { components, setComponents } = useComponents();
  const [position, setPosition] = useState<PositionProps>({
    ...elementData.position,
  });
  const [hovered, setHovered] = useState(false);

  const clickHandler = useCallback(
    () => {
      // console.log("Click Index", index);
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
      console.log("-------------------------------------------", components),
    [components]
  );

  const setcomponentsHandler = () => {
    const componentIndex = components.findIndex(
      (component) => component.id === elementData.id
    );
    if (componentIndex !== -1) {
      components[componentIndex].position = position;
      components[componentIndex].displayName = `${elementData.name} ${
        index + 1
      }`;
      setComponents && setComponents([...components]);
    } else {
      const newComponent = {
        ...elementData,
        displayName: `${elementData.name} ${index + 1}`,
      };
      setComponents && setComponents([...components, newComponent]);
    }
  };

  useEffect(() => {
    console.log("position updated", position);
    setcomponentsHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

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
      onClick={clickHandler}
      style={{
        border: focused
          ? "1px solid var(--primary)"
          : hovered
          ? "1px solid var(--grey-background)"
          : "none",
      }}
      className="dnd-container"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {(hovered || focused) && <ElementActions />}
      <div ref={ref}>{children}</div>
    </Rnd>
  );
};

export default PreviewContainer;
