import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { Header } from '../components/header'
import { useMe } from '../hooks/useMe'
import { NotFound } from '../pages/404'
import { Podcasts } from '../pages/client/podcasts'


const ClientRoutes = [
  <Route path="/" exact>
    <Podcasts />
  </Route>,
]


export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return <div className='h-screen flex justify-center items-center '>
      <span className="font-medium text-xl tracking-wide text-white">Loading...</span>
    </div>
  }
  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === "Listener" && ClientRoutes}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};