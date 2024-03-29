import "./App.less";
import { LoginPage } from "components/login/LoginPage";
import { LogupPage } from "components/logup/LogupPage";
import { ToastContainer } from "react-toastify";
import useLocalStorage from "hooks/useLocalStorage";
import { PageList } from "components/pageList";
import Page from "components/page";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/">
            <Route path="" element={<LoginPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="logup" element={<LogupPage />} />
            <Route
              path="pages"
              element={
                <ProtectedRoutes>
                  <PageList />
                </ProtectedRoutes>
              }
            />
            <Route
              path="pages/:pageId"
              element={
                <ProtectedRoutes>
                  <Page />
                </ProtectedRoutes>
              }
            />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
      />
    </Router>
  );
}

interface ProtectedRoutesProps {
  children: React.ReactNode;
}

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const [accessToken] = useLocalStorage<string | null>("auth");
  return accessToken ? <>{children}</> : <Navigate to="/login" />;
};

export default App;
