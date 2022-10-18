import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge } from "antd";
import React from "react";

interface AvatarBlockProps {
  badgeCount?: number;
}

const AvatarBlock: React.FC<AvatarBlockProps> = ({ badgeCount = 0 }) => (
  <>
    <span className="avatar-item">
      <Badge count={badgeCount}>
        <Avatar shape="square" icon={<UserOutlined />} />
      </Badge>
    </span>
  </>
);

export default AvatarBlock;
