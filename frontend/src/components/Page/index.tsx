import NavBarPage from "components/navbar/NavBarPage";
import { FC, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ComponentsProvider from "contexts/ComponentsContext";
import Preview from "components/editor/preview/Preview";
import DraggableComponent from "components/editor/draggableElements/DraggableComponent";
import DraggableComponent2 from "components/editor/draggableElements/DraggableComponent2";
import { PAGE_WITH_DATA } from "queries/page.query";
import { useLazyQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { PageItem } from "types/page.type";

import "./index.less";

const Page: FC = () => {
  let { pageId } = useParams();
  const [pageData, setPageData] = useState<PageItem>();

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
    userPage({ variables: { id: pageId } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageId]);

  return (
    <>
      <NavBarPage
        type="page"
        pageId={pageId}
        userData={pageData ? pageData.user : undefined}
      />
      <Outlet />
      <DndProvider backend={HTML5Backend}>
        <div className="pageContainer">
          <ComponentsProvider>
            <div className="page pageLeft">
              <Preview />
            </div>
            <div className="page pageRight">
              <div className="draggableComponentContainer">
                <DraggableComponent />
                <DraggableComponent2 />
                <DraggableComponent />
                <DraggableComponent2 />
                <DraggableComponent />
                <DraggableComponent2 />
                <DraggableComponent />
                <DraggableComponent2 />
                <DraggableComponent />
                <DraggableComponent2 />
                <DraggableComponent />
                <DraggableComponent2 />
                <DraggableComponent />
                <DraggableComponent2 />
                <DraggableComponent />
                <DraggableComponent2 />
                <DraggableComponent />
                <DraggableComponent2 />
                <DraggableComponent />
                <DraggableComponent2 />
                <DraggableComponent />
                <DraggableComponent2 />
                <DraggableComponent />
                <DraggableComponent2 />
                <DraggableComponent />
                <DraggableComponent2 />
                <DraggableComponent />
                <DraggableComponent2 />
                <DraggableComponent />
                <DraggableComponent2 />
                <DraggableComponent />
                <DraggableComponent2 />
                <DraggableComponent />
                <DraggableComponent2 />
                <DraggableComponent />
                <DraggableComponent2 />
              </div>
            </div>
          </ComponentsProvider>
        </div>
      </DndProvider>
    </>
  );
};

export default Page;
