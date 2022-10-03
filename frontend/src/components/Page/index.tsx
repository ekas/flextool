import NavBarPage from "components/navbar/NavBarPage";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ComponentsProvider from "contexts/ComponentsContext";

import Preview from "components/editor/preview/Preview";
import DraggableComponent from "components/editor/draggableElements/DraggableComponent";
import DraggableComponent2 from "components/editor/draggableElements/DraggableComponent2";

import "./index.less";

const Page: FC = () => {
  return (
    <>
      <NavBarPage type="page" />
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
