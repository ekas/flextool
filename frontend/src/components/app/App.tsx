import "./App.less";
import { LoginPage } from "components/login/LoginPage";
import { LogupPage } from "components/logup/LogupPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppsPages } from "components/apps/AppsPage";
import Page from "components/Page";

function App() {
  const pageList = Array.from({ length: 23 }).map((_, i) => ({
    href: `${i}`,
    title: `Onboarding Page ${i}`,
    description: "Edited 2 months ago",
  }));
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/">
            <Route path="" element={<LoginPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="logup" element={<LogupPage />} />
            <Route path="pages" element={<AppsPages apps={pageList} />} />
            <Route path="pages/:pageId" element={<Page />} />
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
    </Router>
  );
}

export default App;
