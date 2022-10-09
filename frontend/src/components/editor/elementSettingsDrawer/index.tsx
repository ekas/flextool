import { FC, useState } from "react";
import { Button, Drawer, Form, Input } from "antd";
import ReactJson from "react-json-view";
import { toast } from "react-toastify";
import { ComponentProps } from "contexts/ComponentsContext";

interface ElementSettingsDrawerProps {
  componentsData: ComponentProps[];
  settingsElementId: string;
  setSettingsElementId: (id: string | null) => void;
  isSettingsDrawerOpen: boolean;
  setSettingsDrawerOpen: (value: boolean) => void;
  setComponentsData: (data: ComponentProps[]) => void;
}

const ElementSettingsDrawer: FC<ElementSettingsDrawerProps> = ({
  componentsData,
  settingsElementId,
  setSettingsElementId,
  isSettingsDrawerOpen,
  setSettingsDrawerOpen,
  setComponentsData,
}) => {
  const onSettingsDrawerClose = () => {
    setSettingsDrawerOpen(false);
    setSettingsElementId(null);
  };

  const { name, displayName, position, props } = componentsData.filter(
    (component) => component.id === settingsElementId
  )[0];

  const [formData, setFormData] = useState({
    displayName: "displayName",
    position: position,
    props: props,
  });

  return (
    <Drawer
      title={`Settings - ${name}`}
      placement="right"
      size={"large"}
      onClose={onSettingsDrawerClose}
      visible={isSettingsDrawerOpen}
    >
      <Form
        layout={"vertical"}
        name="settingsForm"
        initialValues={{
          displayName: displayName,
          width: position.width,
          height: position.height,
          x: position.x,
          y: position.y,
          props: props,
        }}
        onFinish={() => {
          setComponentsData([
            ...componentsData.map((component) => {
              if (component.id === settingsElementId) {
                return {
                  ...component,
                  displayName: formData.displayName,
                  props: formData.props,
                };
              } else {
                return component;
              }
            }),
          ]);
          toast.success(`Settings for ${name} updated successfully!`);
          onSettingsDrawerClose();
        }}
      >
        <Form.Item name="displayName" label="Display Name">
          <Input
            type="text"
            placeholder="Display Name"
            value={formData.displayName}
            onChange={(e) =>
              setFormData({ ...formData, displayName: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item name="x" label="Position - X">
          <Input
            type="text"
            placeholder="X"
            defaultValue={position.x}
            disabled
          />
        </Form.Item>
        <Form.Item name="y" label="Position - Y">
          <Input
            type="text"
            placeholder="Y"
            defaultValue={position.y}
            disabled
          />
        </Form.Item>
        <Form.Item name="width" label="Position - Width">
          <Input
            type="text"
            placeholder="Width"
            defaultValue={position.width}
            disabled
          />
        </Form.Item>
        <Form.Item name="height" label="Position - Height">
          <Input
            type="text"
            placeholder="Height"
            defaultValue={position.height}
            disabled
          />
        </Form.Item>
        <div
          style={{
            margin: "30px 0 0",
          }}
        >
          <span>Properties</span>
          <ReactJson
            name={false}
            collapsed={true}
            style={{
              padding: "10px",
              borderRadius: "3px",
              margin: "-10px 0 0",
            }}
            theme={"rjv-default"}
            src={formData.props}
            onEdit={(e) => {
              setFormData({ ...formData, props: e.updated_src });
            }}
            onDelete={(e) => {
              setFormData({ ...formData, props: e.updated_src });
            }}
            onAdd={(e) => {
              setFormData({ ...formData, props: e.updated_src });
            }}
            displayObjectSize={true}
            enableClipboard={true}
            indentWidth={2}
            displayDataTypes={true}
            iconStyle={"square"}
            collapseStringsAfterLength={5}
          />
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="loginFormBtn">
            Update
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default ElementSettingsDrawer;
