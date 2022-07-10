import React, { useCallback } from "react";

interface PreviewContainerProps {
  index: number;
  focused: Boolean;
  onClick: Function;
  children: React.ReactNode;
}

const PreviewContainer = ({
  children,
  focused,
  index,
  onClick,
}: PreviewContainerProps) => {
  const clickHandler = useCallback(() => {
    console.log("clicked 1");
    onClick(index);
  }, [onClick]);

  return (
    <div style={{ border: focused && "1px solid blue" }} onClick={clickHandler}>
      {children}
    </div>
  );
};

export default PreviewContainer;
