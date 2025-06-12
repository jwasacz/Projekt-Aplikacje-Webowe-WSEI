import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Crud from "./components/ProjectCreator";
import ProjectDetails from "./components/StoryCreator";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Crud />} />
          <Route path="/project/:projectId" element={<ProjectDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
