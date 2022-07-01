/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from "react";
import {
  Avatar,
  Button,
  Checkbox,
  Col,
  Divider,
  Dropdown,
  Input,
  List,
  Menu,
  Row,
  Space,
} from "antd";
import { UserOutlined, CaretDownOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.svg";
import appAvatar from "../../assets/app_avatar.svg";
import popMenu from "../../assets/pop_menu.svg";
import appsIcon from "../../assets/apps.svg";
import dataSourcesIcon from "../../assets/datasource.svg";
import "./index.less";
import { Link } from "react-router-dom";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

export const AppsPages: FC = () => {
  const { Search } = Input;

  const onSearch = (value: string) => console.log(value);
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const data = Array.from({ length: 23 }).map((_, i) => ({
    href: "/",
    title: `Onboarding Page ${i}`,
    description: "Edited 2 months ago",
  }));

  return (
    <>
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
      <Row className="mainContainer" gutter={16}>
        <Col className="gutter-row leftCol" span={6}>
          <div className="">
            <h4>All(1)</h4>
            <h4>Recent(0)</h4>
            <h4>Starred(1)</h4>
            <h4>Trash(1)</h4>
          </div>
        </Col>
        <Col className="gutter-row rightCol" span={18}>
          <div className="rightHeaderContainer">
            <div className="rightHeader">
              <h2>All</h2>
              <span>
                <Search
                  className="searchField"
                  placeholder="Input Search Text"
                  onSearch={onSearch}
                  enterButton
                />
                <Button
                  type="primary"
                  htmlType="submit"
                  className="creatNewBtn"
                >
                  Create New
                </Button>
              </span>
            </div>
            <Divider plain className="appsDivider" />
            <Checkbox onChange={onChange}>Select All</Checkbox>
            <List
              itemLayout="horizontal"
              size="large"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 8,
              }}
              dataSource={data}
              renderItem={(item) => (
                <List.Item
                  key={item.title}
                  actions={[
                    <Dropdown
                      overlay={appMenu}
                      className="menuAvatar"
                      arrow
                      placement="bottomRight"
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <img src={popMenu} alt="Pop Menu" className="" />
                      </a>
                    </Dropdown>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <img src={appAvatar} alt="App Avatar" className="" />
                    }
                    title={<a href="https://ant.design">{item.title}</a>}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </div>
        </Col>
      </Row>
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

const appMenu = (
  <Menu
    items={[
      {
        key: "1",
        label: <Link to="/">Duplicate</Link>,
      },
      {
        key: "2",
        danger: true,
        label: <Link to="/">Delete</Link>,
      },
    ]}
  />
);
