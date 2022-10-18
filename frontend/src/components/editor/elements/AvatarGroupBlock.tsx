import { Avatar } from "antd";
import React from "react";

interface AvatarGroupBlockProps {
  groupData: JSX.Element[];
}

const AvatarGroupBlock: React.FC<AvatarGroupBlockProps> = ({ groupData }) => (
  <>
    <Avatar.Group>{groupData.map((item, index) => item)}</Avatar.Group>
  </>
);

export default AvatarGroupBlock;
