import { Link } from 'react-router-dom';
// import { Route, Routes } from 'react-router';
import './Home.global.scss';
// import Scheme from 'Components/HomeScheme/Scheme';

export default function Home() {
  return (
    <div id="home">
      <div className="buttons">
        <Link className="button" to="/scheme">
          Create new scheme
        </Link>
        <Link className="button" to="/">
          Open scheme
        </Link>
      </div>
    </div>
  );
}
