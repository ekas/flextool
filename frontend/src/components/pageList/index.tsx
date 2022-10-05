/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Dropdown,
  Input,
  List,
  Menu,
  Row,
} from "antd";
import appAvatar from "../../assets/app_avatar.svg";
import popMenu from "../../assets/pop_menu.svg";
import { Link } from "react-router-dom";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import NavBarPage from "components/navbar/NavBarPage";

import { useLazyQuery } from "@apollo/client";
import { GET_PAGES } from "queries/page.query";
import { toast } from "react-toastify";

import { PageListItem } from "types/page.type";
import { User } from "types/user.type";
import { USER_DATA_QUERY } from "queries/user.query";

import "./index.less";

type PageListProps = {};

export const PageList: FC<PageListProps> = () => {
  const { Search } = Input;
  const [userData, setUserData] = useState<User | undefined>(undefined);
  const [pages, setPages] = useState<PageListItem[] | undefined>(undefined);

  const [userQuery] = useLazyQuery(USER_DATA_QUERY, {
    onCompleted: (QueryData) => {
      setUserData({ ...QueryData.me });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [getPages] = useLazyQuery(GET_PAGES, {
    onCompleted: (QueryData) => {
      setPages(QueryData.userPages);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    userQuery();
    getPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pageDelete = (page: PageListItem) => {
    console.log("menu pageDelete", page);
  };

  const pageRename = (page: PageListItem) => {
    console.log("menu pageRename", page);
  };

  const createNewPage = (pageName: string) => {
    console.log("menu page create", pageName);
  };

  const onSearch = (value: string) => console.log(value);
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <>
      <NavBarPage type="pages" userData={userData} />
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
                {userData && userData.role === "DEVELOPER" && (
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="creatNewBtn"
                  >
                    Create New
                  </Button>
                )}
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
                pageSize: 5,
              }}
              dataSource={pages}
              renderItem={(page) => (
                <List.Item
                  key={page.name}
                  actions={[
                    userData && userData.role === "DEVELOPER" ? (
                      <Dropdown
                        overlay={appMenu(page, pageDelete, pageRename)}
                        className="menuAvatar"
                        arrow
                        placement="bottomRight"
                      >
                        <a onClick={(e) => e.preventDefault()}>
                          <img src={popMenu} alt="Pop Menu" className="" />
                        </a>
                      </Dropdown>
                    ) : null,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <img src={appAvatar} alt="App Avatar" className="" />
                    }
                    title={<Link to={page.id}>{page.name}</Link>}
                    description={`Last edited on ${new Date(
                      page.updatedAt
                    ).toDateString()}`}
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

const appMenu = (
  pageData: PageListItem,
  pageDelete: (page: PageListItem) => void,
  pageRename: (page: PageListItem) => void
) => (
  <Menu
    items={[
      {
        key: "1",
        label: "Rename",
        onClick: () => {
          pageRename(pageData);
        },
      },
      {
        key: "2",
        danger: true,
        label: "Delete",
        onClick: () => {
          pageDelete(pageData);
        },
      },
    ]}
  />
);
