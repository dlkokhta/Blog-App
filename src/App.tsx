import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
