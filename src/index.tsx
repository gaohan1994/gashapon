import * as React from 'react';
import * as ReactDOM from 'react-dom';
import store from './store/index';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './history';
import routes from './routes';

ReactDOM.render(
  <Provider store={store()}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);