import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import RocketDetailPage from "./views/RocketDetailPage"; // Create this component for details view

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rockets/:id" element={<RocketDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
