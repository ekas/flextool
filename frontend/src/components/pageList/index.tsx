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
  Spin,
} from "antd";
import appAvatar from "../../assets/app_avatar.svg";
import popMenu from "../../assets/pop_menu.svg";
import { Link } from "react-router-dom";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import NavBarPage from "components/navbar/NavBarPage";
import { useLazyQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { PageItem } from "types/page.type";
import { User } from "types/user.type";
import CustomModal from "components/customModal";
import { USER_DATA_QUERY } from "queries/user.query";
import {
  GET_PAGES,
  PAGE_CREATE,
  PAGE_DELETE,
  PAGE_EDIT,
} from "queries/page.query";

import "./index.less";

type PageListProps = {};

export const PageList: FC<PageListProps> = () => {
  const { Search } = Input;
  const [userData, setUserData] = useState<User | undefined>(undefined);
  const [pages, setPages] = useState<PageItem[] | undefined>(undefined);
  const [pageData, setPageData] = useState<PageItem | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Create New Page");
  const [modalInput, setModalInput] = useState("");

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
      setLoading(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [deletePage] = useMutation(PAGE_DELETE, {
    onCompleted: (QueryData) => {
      if (pages)
        setPages([
          ...pages.filter((page) => page.id !== QueryData.deletePage.id),
        ]);
      toast.success(`${QueryData.deletePage.name} Deleted`);
      setLoading(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [editPage] = useMutation(PAGE_EDIT, {
    onCompleted: (QueryData) => {
      if (pages)
        setPages([
          ...pages.map((page) => {
            if (page.id === QueryData.editPage.id) return QueryData.editPage;
            return page;
          }),
        ]);
      toast.success(`${QueryData.editPage.name} Updated`);
      setLoading(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [createPage] = useMutation(PAGE_CREATE, {
    onCompleted: (QueryData) => {
      if (pages) setPages([...pages, QueryData.createPage]);
      toast.success(`${QueryData.createPage.name} Added`);
      setLoading(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    userQuery();
    getPages();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pageDelete = (page: PageItem) => {
    setLoading(true);
    deletePage({ variables: { id: page.id } });
  };

  const pageRenameModal = (page: PageItem) => {
    setPageData(page);
    setModalTitle("Rename Page");
    setModalInput(page.name);
    setIsModalOpen(true);
  };

  const renamePage = (pageName: string) => {
    setLoading(true);
    editPage({ variables: { ...pageData, name: pageName } });
  };

  const createNewPage = (pageName: string) => {
    setLoading(true);
    createPage({
      variables: {
        name: pageName,
        slug: pageName.toLowerCase().replaceAll(/\s/g, ""),
      },
    });
  };

  const onSearch = (value: string) => console.log(value);
  const onChange = (e: CheckboxChangeEvent) => {};

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
          <Spin spinning={loading}>
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
                      onClick={() => {
                        setModalTitle("Create New Page");
                        setIsModalOpen(true);
                      }}
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
                  onChange: (page) => {},
                  pageSize: 5,
                }}
                dataSource={pages}
                renderItem={(page) => (
                  <List.Item
                    key={page.name}
                    actions={[
                      userData && userData.role === "DEVELOPER" ? (
                        <Dropdown
                          overlay={appMenu(page, pageDelete, pageRenameModal)}
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
          </Spin>
        </Col>
      </Row>
      <CustomModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title={modalTitle}
        onOk={() => {
          modalTitle === "Create New Page" && createNewPage(modalInput);
          modalTitle === "Rename Page" && renamePage(modalInput);
          setIsModalOpen(false);
          setModalInput("");
        }}
      >
        <Input
          autoFocus
          type="text"
          placeholder="Enter Page Name"
          value={modalInput}
          onChange={(e) => setModalInput(e.target.value)}
        />
      </CustomModal>
    </>
  );
};

const appMenu = (
  pageData: PageItem,
  pageDelete: (page: PageItem) => void,
  pageRenameModal: (page: PageItem) => void
) => (
  <Menu
    items={[
      {
        key: "1",
        label: "Rename",
        onClick: () => {
          pageRenameModal(pageData);
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
