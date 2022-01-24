import { Link } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import Scheme from 'Components/HomeScheme/Scheme';
import './Home.global.scss';
// import Header from 'Components/Header/header';

export default function Home() {
  return (
    <div id="home">
      {/* <Header /> */}
      <div className="buttons">
        <Link className="button" to="/scheme">
          Create new scheme
        </Link>
        <Link className="button" to="/">
          Open scheme
        </Link>
      </div>
      <Routes>
        <Route path="/scheme" element={<Scheme />} />
      </Routes>
    </div>
  );
}
