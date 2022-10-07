import { FC, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import NavBarPage from "components/navbar/NavBarPage";
import ComponentsProvider from "contexts/ComponentsContext";
import Preview from "components/editor/preview/Preview";
import ElementList from "components/editor/elementList";
import { PAGE_WITH_DATA } from "queries/page.query";
import { useLazyQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { PageItem } from "types/page.type";
import { USER_DATA_QUERY } from "queries/user.query";
import { User } from "types/user.type";

import "./index.less";

const Page: FC = () => {
  let { pageId } = useParams();
  const [userData, setUserData] = useState<User | undefined>(undefined);
  const [pageData, setPageData] = useState<PageItem>();

  const [userQuery] = useLazyQuery(USER_DATA_QUERY, {
    onCompleted: (QueryData) => {
      setUserData({ ...QueryData.me });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [userPage] = useLazyQuery(PAGE_WITH_DATA, {
    onCompleted: (QueryData) => {
      setPageData(QueryData.userPageWithComponentData);
      toast.success(`${QueryData.userPageWithComponentData.name} page loaded`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    userQuery();
    userPage({ variables: { id: pageId } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageId]);

  return (
    <>
      <NavBarPage type="page" pageData={pageData} userData={userData} />
      <Outlet />
      <DndProvider backend={HTML5Backend}>
        <div className="pageContainer">
          <ComponentsProvider>
            <div className="page pageLeft">
              <Preview />
            </div>
            <div className="page pageRight">
              <div className="draggableComponentContainer">
                <ElementList />
              </div>
            </div>
          </ComponentsProvider>
        </div>
      </DndProvider>
    </>
  );
};

export default Page;
