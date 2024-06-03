import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ManualPage from "./pages/ManualPage";
import Setting_1Page from "./pages/Setting_1Page";
import Dummy from "./views/Dummy";
import OperationsPage from "./pages/OperationsPage";
import Setting_2Page from "./pages/Setting_2Page";
import Setting_3Page from "./pages/Setting_3Page";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/manual" Component={ManualPage} />
          <Route path="/setting1" Component={Setting_1Page} />
          <Route path="/setting2" Component={Setting_2Page} />
          <Route path="/setting3" Component={Setting_3Page} />
          <Route path="/" Component={OperationsPage} />
          <Route path="/dummy" Component={Dummy} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
