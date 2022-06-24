import { FC } from "react";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "./index.less";
import logo from "../../assets/logo.svg";
import appsIcon from "../../assets/apps.svg";
import dataSourcesIcon from "../../assets/datasource.svg";

export const AppsPages: FC = () => {
  return (
    <>
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
    </>
  );
};
