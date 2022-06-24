import "./App.less";
import { LoginPage } from "components/login/LoginPage";
import { LogupPage } from "components/logup/LogupPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppsPages } from "components/apps/AppsPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/">
            <Route path="" element={<LoginPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="logup" element={<LogupPage />} />
            <Route path="apps" element={<AppsPages />} />
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
