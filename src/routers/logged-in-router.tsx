import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { Header } from '../conponents/header'
import { useMe } from '../hooks/useMe'
import { Podcast } from '../pages/client/podcasts'


const ClientRoutes = [
  <Route path="/" exact>
    <Podcast />
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
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};