import React, { lazy, Suspense } from 'react';
import { Route,  Switch, BrowserRouter, Redirect } from 'react-router-dom'

import Loading from '../components/loading'
import App from '../containers/app'

// 按需加载页面
const Feeds = lazy(() => import('../containers/feeds'))
const InvitationCode = lazy(() => import('../containers/invitation-code'))
const NoFound = lazy(() => import('../containers/404'))

const AppRouter = () => {
  // url中加入语言
  const language = window.language;
  // 按需加载
  const suspense = (component) => {
    return (
      <Suspense fallback={<Loading/>}>
        { component }
      </Suspense>
    )
  }

  return (
    <BrowserRouter basename={language}>
      <App>
        <Switch>
          <Route path='/feeds' component={() => {return suspense(<Feeds />)}} />
          <Route path='/invitation-code' component={() => {return suspense(<InvitationCode />)}} />
          <Route component={() => {return suspense(<NoFound />)}} />
          <Redirect to='/404' />
        </Switch>
      </App>
    </BrowserRouter>
  )
}

export default AppRouter;
