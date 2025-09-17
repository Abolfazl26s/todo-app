import { HashRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import TasksPage from "./components/TasksPage";
import "./App.css";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<TasksPage />} />
        </Routes>
      </HashRouter>
      <Footer />
    </>
  );
}

export default App;
