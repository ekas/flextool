import { FC } from "react";
import { SettingOutlined, DeleteOutlined } from "@ant-design/icons";

import "./index.less";

interface ElementActionsProps {
  displayName: string;
  onDelete: (elementId: string) => void;
  elementId: string;
}

const ElementActions: FC<ElementActionsProps> = ({
  displayName,
  onDelete,
  elementId,
}) => {
  return (
    <div className="actionsHandle">
      <span className="actionsHeader">
        {displayName} <SettingOutlined />
      </span>
      <DeleteOutlined
        className="actionsDelete"
        onClick={() => onDelete(elementId)}
      />
    </div>
  );
};

export default ElementActions;
