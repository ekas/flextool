import { FC } from "react";
import { SettingOutlined, DeleteOutlined } from "@ant-design/icons";

import "./index.less";

interface ElementActionsProps {
  displayName: string;
  onDelete: (elementId: string) => void;
  onSettings: (elementId: string) => void;
  elementId: string;
}

const ElementActions: FC<ElementActionsProps> = ({
  displayName,
  onDelete,
  onSettings,
  elementId,
}) => {
  return (
    <div className="actionsHandle">
      <span className="actionsHeader">{displayName}</span>
      <span>
        <SettingOutlined
          className="actionsSettings"
          onClick={() => {
            onSettings(elementId);
          }}
        />
        <DeleteOutlined
          className="actionsDelete"
          onClick={() => onDelete(elementId)}
        />
      </span>
    </div>
  );
};

export default ElementActions;
