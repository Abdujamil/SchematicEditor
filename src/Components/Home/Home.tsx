import { Link } from 'react-router-dom';
import './Home.global.scss';

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
