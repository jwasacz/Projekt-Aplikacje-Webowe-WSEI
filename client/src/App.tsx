import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Crud from "./components/ProjectCreator";
import ProjectDetails from "./components/StoryCreator";
import Login from "./components/LoginForm";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

function AppRoutes() {
  const { isAuthenticated, isLoading } = useAuth();

 if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />}
        />
        <Route
          path="/home"
          element={isAuthenticated ? <Crud /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/project/:projectId"
          element={isAuthenticated ? <ProjectDetails /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}


function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;