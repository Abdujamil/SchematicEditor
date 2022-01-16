import './Home.global.scss';
import { Link } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import Scheme from 'Components/HomeScheme/Scheme';

export default function Home() {
  return (
    <>
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
    </>
  );
}
