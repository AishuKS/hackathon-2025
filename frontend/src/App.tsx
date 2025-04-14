// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Signup/SignupPage";
import SharerDashboard from "./pages/SharerDashboard/SharerDashboard";
import FinderDashboard from "./pages/FinderDashboard/FinderDashboard"; // ✅ Import FinderDashboard
import AddFoodModal from "./pages/SharerDashboard/AddFoodModal"; // ✅ Import AddFoodModal
import ViewMyFoods from "./pages/SharerDashboard/ViewMyFoods"; // ✅ Import ViewMyFoods

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/sharer-dashboard" element={<SharerDashboard />} />
        <Route path="/finder-dashboard" element={<FinderDashboard />} />
        <Route path="/add-food" element={<AddFoodModal />} /> {/* ✅ Added AddFoodPage route */}
        <Route path="/myfoods" element={<ViewMyFoods />} /> {/* ✅ Added ViewMyFoods route */}
      </Routes>
    </Router>
  );
}

export default App;
