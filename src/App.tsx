import './sass/index.scss';

import './App.css';
import Home from './pages/Home';
import AddCard from './pages/AddCard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addcard" element={<AddCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
