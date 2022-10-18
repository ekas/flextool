import { Divider } from "antd";
import React from "react";

interface DividerBlockProps {
  orientation?: "left" | "right" | "center";
  dashed?: boolean;
  plain?: boolean;
}
const DividerBlock: React.FC<DividerBlockProps> = ({
  orientation = "center",
  dashed = false,
  plain = false,
}) => <Divider plain={plain} orientation={orientation} dashed={dashed} />;

export default DividerBlock;
