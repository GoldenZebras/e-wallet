import "./sass/index.scss";

import "./App.css";
import HomeComponent from "./pages/Home";
import AddCard from "./pages/AddCard";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/addcard" element={<AddCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
