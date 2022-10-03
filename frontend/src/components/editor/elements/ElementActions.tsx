import { FC } from "react";
import { SettingOutlined, DeleteOutlined } from "@ant-design/icons";

import "./index.less";

interface ElementActionsProps {
  name?: string;
}

const ElementActions: FC<ElementActionsProps> = ({ name }) => {
  return (
    <div className="actionsHandle">
      <span className="actionsHeader">
        Actions <SettingOutlined />
      </span>
      <DeleteOutlined className="actionsDelete" />
    </div>
  );
};

export default ElementActions;
