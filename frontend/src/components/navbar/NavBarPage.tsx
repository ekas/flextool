/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import { Avatar, Button, Dropdown, Menu, Space } from "antd";
import {
  UserOutlined,
  CaretDownOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import logo from "../../assets/logo.svg";
import appsIcon from "../../assets/apps.svg";
import dataSourcesIcon from "../../assets/datasource.svg";
import { Link, useNavigate } from "react-router-dom";

import "./index.less";
import { User } from "types/user.type";

interface NavBarPageProps {
  type: "pages" | "page";
  userData?: User;
}

const NavBarPage: FC<NavBarPageProps> = ({ type, userData }) => {
  const navigate = useNavigate();
  return (
    <>
      {type === "pages" ? (
        <div className="navBarContainer">
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["pages"]}
            className="menuContainer"
          >
            <img src={logo} alt="Logo" className="appLogo" />
            <Menu.Item
              key="pages"
              icon={<img src={appsIcon} alt="Pages Menu" />}
            >
              Pages
            </Menu.Item>
            <Menu.Item
              key="datasource"
              icon={<img src={dataSourcesIcon} alt="Data Source Menu" />}
            >
              Data Sources
            </Menu.Item>
          </Menu>
          <Dropdown
            overlay={userMenu(userData ? userData : null)}
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
      ) : (
        <div className="navBarContainer">
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["apps"]}
            className="menuContainer"
          >
            <img src={logo} alt="Logo" className="appLogo" />
            <h4 className="pageName">Page Name</h4>
          </Menu>
          <Button
            type="primary"
            htmlType="submit"
            className="previewBtn"
            icon={<CaretRightOutlined />}
          >
            Preview
          </Button>
          <Button htmlType="submit" className="shareBtn">
            Share
          </Button>
          <Button type="primary" htmlType="submit" className="saveBtn">
            Save
          </Button>
          <Button
            htmlType="submit"
            className="backBtn"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Dropdown
            overlay={userMenu(userData ? userData : null)}
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
      )}
    </>
  );
};

const userMenu = (userData: User | null) => (
  <Menu
    items={[
      {
        key: "1",
        label: userData
          ? `Hello ${userData?.firstName} ${userData?.lastName}`
          : "Hello User",
      },
      {
        type: "divider",
      },
      {
        key: "2",
        danger: true,
        label: "Logout",
        onClick: () => {
          localStorage.removeItem("auth");
          window.location.href = "/";
        },
      },
    ]}
  />
);

export default NavBarPage;
