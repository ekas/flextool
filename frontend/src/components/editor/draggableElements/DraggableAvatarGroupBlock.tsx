import { FC } from "react";
import { useDrag } from "react-dnd";
import { DRAG_TYPES } from "constants/DragTypes";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";

import "./index.less";

const DraggableAvatarGroupBlock: FC = () => {
  const [, drag] = useDrag({
    type: DRAG_TYPES.COMPONENT,
    item: {
      name: "AvatarGroupBlock",
      displayName: "AvatarGroupBlock",
      props: {
        groupData: [
          <Avatar src="https://joeschmoe.io/api/v1/random" />,
          <Avatar style={{ backgroundColor: "#f56a00" }}>J</Avatar>,
          <Tooltip title="Ant User" placement="top">
            <Avatar
              style={{ backgroundColor: "#87d068" }}
              icon={<UserOutlined />}
            />
          </Tooltip>,
          <Avatar
            style={{ backgroundColor: "#1890ff" }}
            icon={<AntDesignOutlined />}
          />,
        ],
      },
      position: { x: 50, y: 50, width: 400, height: 80 },
    },
  });
  return (
    <div ref={drag} className="draggableComponent">
      Avatar Group
    </div>
  );
};

export default DraggableAvatarGroupBlock;
