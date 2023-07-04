import { Routes, Route } from "react-router-dom";
import { routes } from "./data/routes";
import { Navbar } from "./components/Navbar/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {routes.map((route) => (
          <Route key={route.id} path={route.path} element={<route.element />} />
        ))}
      </Routes>
    </>
  );
}

export default App;
