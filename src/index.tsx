import * as React from 'react';
import * as ReactDOM from 'react-dom';
import store from './store/index';
import { Provider } from 'react-redux';

import { BrowserRouter as Router } from 'react-router-dom';
import routes from './routes';

ReactDOM.render(
  <Provider store={store()}>
    <Router>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);