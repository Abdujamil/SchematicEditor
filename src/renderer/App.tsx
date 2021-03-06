import Scheme from 'Components/HomeScheme/Scheme';
import { Routes, Route } from 'react-router-dom';
import Home from 'Components/Home/Home';
// import Header from 'Components/Header/header';

export default function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="scheme" element={<Scheme />} />
        </Routes>
      </div>
    </>
  );
}
