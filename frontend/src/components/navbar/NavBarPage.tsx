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

interface NavBarPageProps {
  type: "apps" | "page";
}

const NavBarPage: FC<NavBarPageProps> = ({ type }) => {
  const navigate = useNavigate();
  return (
    <>
      {type === "apps" ? (
        <div className="navBarContainer">
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["apps"]}
            className="menuContainer"
          >
            <img src={logo} alt="Logo" className="appLogo" />
            <Menu.Item key="apps" icon={<img src={appsIcon} alt="Apps Menu" />}>
              Apps
            </Menu.Item>
            <Menu.Item
              key="datasource"
              icon={<img src={dataSourcesIcon} alt="Data Source Menu" />}
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
      )}
    </>
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

export default NavBarPage;
