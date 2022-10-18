import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import React from "react";

const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            1st menu item
          </a>
        ),
      },
      {
        key: "2",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.aliyun.com"
          >
            2nd menu item (disabled)
          </a>
        ),
        icon: <SmileOutlined />,
        disabled: true,
      },
      {
        key: "3",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.luohanacademy.com"
          >
            3rd menu item (disabled)
          </a>
        ),
        disabled: true,
      },
      {
        key: "4",
        danger: true,
        label: "a danger item",
      },
    ]}
  />
);

interface DropDownBlockProps {
  label: string;
  placement:
    | "bottomLeft"
    | "bottomCenter"
    | "bottomRight"
    | "topLeft"
    | "topCenter"
    | "topRight";
}

const DropDownBlock: React.FC<DropDownBlockProps> = ({ label, placement }) => (
  <Dropdown overlay={menu} placement={placement}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        {label}
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);

export default DropDownBlock;
