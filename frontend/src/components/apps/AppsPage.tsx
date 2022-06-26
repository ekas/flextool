/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import { Avatar, Dropdown, Menu, Space } from "antd";
import { UserOutlined, CaretDownOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.svg";
import appsIcon from "../../assets/apps.svg";
import dataSourcesIcon from "../../assets/datasource.svg";
import "./index.less";
import { Link } from "react-router-dom";

export const AppsPages: FC = () => {
  return (
    <div className="navBarContainer">
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["apps"]}
        className="menuContainer"
      >
        <img src={logo} alt="Logo" className="appLogo" />
        <Menu.Item
          key="apps"
          icon={<img src={appsIcon} alt="Apps Menu" className="menuIcon" />}
        >
          Apps
        </Menu.Item>
        <Menu.Item
          key="datasource"
          icon={
            <img
              src={dataSourcesIcon}
              alt="Data Source Menu"
              className="menuIcon"
            />
          }
        >
          Data Sources
        </Menu.Item>
      </Menu>
      <Dropdown
        overlay={userMenu}
        className="menuAvatar"
        arrow
        placement="bottomRight"
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Avatar size={35} icon={<UserOutlined />} />
            <CaretDownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

const userMenu = (
  <Menu
    items={[
      {
        key: "1",
        label: <Link to="/">Profile</Link>,
      },
      {
        key: "2",
        danger: true,
        label: <Link to="/">Logout</Link>,
      },
    ]}
  />
);
