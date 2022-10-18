import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React from "react";

interface FormBlockProps {
  fieldAName: string;
  fieldBName: string;
}

const FormBlock: React.FC<FormBlockProps> = ({ fieldAName, fieldBName }) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical">
      <Form.Item label={fieldAName} required tooltip="This is a required field">
        <Input placeholder={`Enter ${fieldAName}`} />
      </Form.Item>
      <Form.Item
        label={fieldBName}
        tooltip={{
          title: "Tooltip with customize icon",
          icon: <InfoCircleOutlined />,
        }}
      >
        <Input placeholder={`Enter ${fieldBName}`} />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default FormBlock;
