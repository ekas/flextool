import React, { useCallback, useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import ElementActions from "../elements/ElementActions";

interface PreviewContainerProps {
  index: number;
  focused: boolean;
  onClick: Function;
  children: React.ReactNode;
}

const PreviewContainer = ({
  children,
  focused,
  index,
  onClick,
}: PreviewContainerProps) => {
  const ref = useRef(null as null | HTMLDivElement);
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [hovered, setHovered] = useState(false);

  const clickHandler = useCallback(
    () => {
      console.log("clicked 1");
      onClick(index);
    },
    // eslint-disable-next-line
    [onClick]
  );

  const getComponentDimensions = () => {
    const newHeight: any = ref.current && ref.current.clientHeight;
    setHeight(newHeight);
    const newWidth: any = ref.current && ref.current.clientWidth;
    setWidth(newWidth);
  };

  useEffect(() => getComponentDimensions(), []);

  return (
    <Rnd
      default={{
        x: 20,
        y: 20,
        width: 320,
        height: 200,
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
