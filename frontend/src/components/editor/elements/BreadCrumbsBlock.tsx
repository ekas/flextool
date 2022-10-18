import { Breadcrumb, Menu } from "antd";
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
            href="http://www.alipay.com/"
          >
            General
          </a>
        ),
      },
      {
        key: "2",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.taobao.com/"
          >
            Layout
          </a>
        ),
      },
      {
        key: "3",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.tmall.com/"
          >
            Navigation
          </a>
        ),
      },
    ]}
  />
);

const BreadCrumbsBlock: React.FC = () => (
  <Breadcrumb>
    <Breadcrumb.Item>FlexTool</Breadcrumb.Item>
    <Breadcrumb.Item>
      <a href="#">Component</a>
    </Breadcrumb.Item>
    <Breadcrumb.Item overlay={menu}>
      <a href="#">General</a>
    </Breadcrumb.Item>
    <Breadcrumb.Item>Button</Breadcrumb.Item>
  </Breadcrumb>
);

export default BreadCrumbsBlock;
