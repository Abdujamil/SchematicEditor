import { HashRouter } from 'react-router-dom';
import { render } from 'react-dom';
import App from './App';

render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
);
