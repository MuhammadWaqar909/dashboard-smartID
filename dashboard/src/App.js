import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
// const TheLayout = React.lazy(() => import('./views/forms/layout/Layout'))
// const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const CustomerAdd = React.lazy(() => import('./views/customers/CustomerAdd'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const Customers = React.lazy(() => import('./views/customers/Customers'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
            <Route exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />
            <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />

            <Route
              path="/customers"
              name="Customers"
              render={(props) => <Customers {...props} />}
            />
            <Route
              path="/customers/add"
              name="CustomerAdd"
              render={(props) => <CustomerAdd {...props} />}
            />
            {/* <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} /> */}
          </Switch>
        </React.Suspense>
      </HashRouter>
    )
  }
}

export default App
