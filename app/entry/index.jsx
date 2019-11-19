import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'

import AppRouter from '../router';

import '@/static/style/reset.less';
import '@/static/style/base.less';
import '@/static/style/app.less';
import '@/static/style/animate.css'

ReactDOM.render(
  <AppContainer>
    <AppRouter />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept()
}