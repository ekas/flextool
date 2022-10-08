import { FC } from "react";
import DraggableArticleBlock from "../draggableElements/DraggableArticleBlock";
import DraggablePageHeaderBlock from "../draggableElements/DraggablePageHeaderBlock";
import DraggableTable from "../draggableElements/DraggableTable";

interface ElementListProps {}

const ElementList: FC<ElementListProps> = () => {
  return (
    <>
      <DraggableTable />
      <DraggableArticleBlock />
      <DraggablePageHeaderBlock />
    </>
  );
};

export default ElementList;
