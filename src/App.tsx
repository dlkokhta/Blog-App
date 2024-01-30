import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import BlogByID from "./pages/blogByID";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blog/:id" element={<BlogByID />} />
      </Routes>
    </>
  );
}

export default App;
