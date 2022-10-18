import { Button } from "antd";
import React from "react";

interface ButtonBlockProps {
  buttonLabel: string;
  buttonType: "primary" | "dashed" | "link" | "text" | "default";
}

const ButtonBlock: React.FC<ButtonBlockProps> = ({
  buttonLabel,
  buttonType,
}) => (
  <>
    <Button type={buttonType}>{buttonLabel}</Button>
  </>
);

export default ButtonBlock;
