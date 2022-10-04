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
import { USER_DATA_QUERY } from "queries/auth.query";
import { GET_PAGES } from "queries/page.query";
import { toast } from "react-toastify";

import "./index.less";

interface User {
  id: string | null;
  role: "DEVELOPER" | "ADMIN" | "OPERATOR" | null;
}

interface PageListItem {
  createdAt: string;
  definition: string;
  id: string;
  isPublic: boolean;
  name: string;
  slug: string;
  updatedAt: string;
  userId: string;
  user: User;
}

type PageListProps = {};

export const PageList: FC<PageListProps> = () => {
  const { Search } = Input;
  const [userData, setUserData] = useState<User>({
    id: null,
    role: null,
  });
  const [pages, setPages] = useState<PageListItem[] | undefined>(undefined);

  const [userQuery] = useLazyQuery(USER_DATA_QUERY, {
    onCompleted: (QueryData) => {
      const { id, role } = QueryData.me;
      setUserData({ id: id, role: role });
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

  const onSearch = (value: string) => console.log(value);
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <>
      <NavBarPage type="pages" />
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
                {userData.role === "DEVELOPER" && (
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
              renderItem={(item) => (
                <List.Item
                  key={item.name}
                  actions={[
                    item.user.role === "DEVELOPER" ? (
                      <Dropdown
                        overlay={appMenu}
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
                    title={<Link to={item.id}>{item.name}</Link>}
                    description={`Last edited on ${new Date(
                      item.updatedAt
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
