import NavBarPage from "components/navbar/NavBarPage";
import { FC } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const Page: FC = () => {
  const { appId } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <NavBarPage />
      <div>-</div>
      <div>-</div>
      <div>-</div>
      <div>-</div>
      <div>-</div>
      <div>-</div>
      <div>-</div>
      <div>-</div>
      <button onClick={() => navigate(-1)}>Go back - {appId}</button>
      <Outlet />
    </>
  );
};

export default Page;
