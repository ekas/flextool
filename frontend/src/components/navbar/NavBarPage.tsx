/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useState } from "react";
import { Avatar, Button, Drawer, Dropdown, Menu, Space } from "antd";
import {
  UserOutlined,
  CaretDownOutlined,
  CaretRightOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import logo from "../../assets/logo.svg";
import appsIcon from "../../assets/apps.svg";
import { useNavigate } from "react-router-dom";
import { User } from "types/user.type";
import CustomComment from "components/comments";
import { PageItem } from "types/page.type";

import "./index.less";

interface NavBarPageProps {
  type: "pages" | "page";
  userData: User | undefined;
  pageData?: PageItem;
  pageSaveHandler?: () => void;
  pagePreviewHandler?: () => void;
}

const NavBarPage: FC<NavBarPageProps> = ({
  type,
  userData,
  pageData,
  pageSaveHandler,
  pagePreviewHandler,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const showCommentsDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
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
        <>
          <div className="navBarContainer">
            <Menu
              mode="horizontal"
              defaultSelectedKeys={["apps"]}
              className="menuContainer"
            >
              <img src={logo} alt="Logo" className="appLogo" />
              <h4 className="pageName">{pageData?.name}</h4>
            </Menu>
            {userData?.role === "DEVELOPER" && (
              <>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="previewBtn"
                  icon={<CaretRightOutlined />}
                  onClick={pagePreviewHandler}
                >
                  Preview
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="saveBtn"
                  onClick={pageSaveHandler}
                >
                  Save
                </Button>
              </>
            )}
            <Button
              htmlType="submit"
              className="backBtn"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="commentsBtn"
              icon={<CommentOutlined />}
              onClick={showCommentsDrawer}
            >
              Comments
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
          <Drawer
            title={"Comments"}
            placement="left"
            size={"large"}
            onClose={onClose}
            visible={open}
          >
            <CustomComment
              pageId={pageData && pageData.id}
              userData={userData}
            />
          </Drawer>
        </>
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
