import { FC } from "react";
import DraggableArticleBlock from "../draggableElements/DraggableArticleBlock";
import DraggableTable from "../draggableElements/DraggableTable";

interface ElementListProps {}

const ElementList: FC<ElementListProps> = () => {
  return (
    <>
      <DraggableTable />
      <DraggableArticleBlock />
    </>
  );
};

export default ElementList;
