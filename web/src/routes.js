import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated, userGetPermission } from "./services/auth";

import Header from "./pages/template/Header";
import SideBar from "./pages/template/SideBar";
import Footer from "./pages/template/Footer";
import Messages from "./pages/template/Message";

import SignIn from "./pages/auth/SingIn";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import Users from "./pages/users/Users";
import UserRegister from "./pages/users/UserRegister";
import UserProfile from "./pages/users/UserProfile";
import Accounts from "./pages/accounts/Accounts";
import AccountRegister from "./pages/accounts/AccountRegister";
import Condominiums from "./pages/condominiums/Condominiums";
import CondominiumRegister from "./pages/condominiums/CondominiumRegister";

const PrivateRoute = ({ component: Component, permission, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (!isAuthenticated()) {
        return (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        );
      }

      let permissions = userGetPermission();
      permissions = permissions !== "undefined" ? permissions : [];

      if (permission && !permission.includes(permissions)) {
        return (
          <Redirect
            to={{ pathname: "/app", state: { from: props.location } }}
          />
        );
      }

      return (
        <div className="wrapper">
          <Header />
          <SideBar />
          <div className="content-wrapper">
            <Component {...props} />
          </div>
          <Footer />
          <Messages />
        </div>
      );
    }}
  />
);

const Routes = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={() => <SignIn />} />
      <Route
        exact
        path="/forgot_password"
        component={() => <ForgotPassword />}
      />
      <Route exact path="/reset_password" component={() => <ResetPassword />} />
      <PrivateRoute exact path="/app" component={() => <Dashboard />} />

      <PrivateRoute
        exact
        path="/app/usuarios"
        permission={['Administrador', 'Síndico', 'Proprietário', 'Morador']}
        component={() => <Users />}
      />
      <PrivateRoute
        exact
        path="/app/usuarios/add"
        permission={['Administrador', 'Síndico']}
        component={() => <UserRegister type="create" />}
      />
      <PrivateRoute
        exact
        path="/app/usuarios/edit/:id"
        permission={['Administrador', 'Síndico']}
        component={() => <UserRegister type="edit" />}
      />
      <PrivateRoute
        exact
        path="/app/usuarios/view/:id"
        permission={['Administrador', 'Síndico', 'Proprietário', 'Morador']}
        component={() => <UserRegister type="view" />}
      />
      <PrivateRoute
        exact
        path="/app/perfil"
        component={() => <UserProfile />}
      />

      <PrivateRoute
        exact
        path="/app/contas"
        permission={['Administrador', 'Síndico', 'Proprietário', 'Morador']}
        component={() => <Accounts />}
      />
      <PrivateRoute
        exact
        path="/app/contas/add"
        permission={['Administrador','Síndico']}
        component={() => <AccountRegister type="create" />}
      />
      <PrivateRoute
        exact
        path="/app/contas/edit/:id"
        permission={['Administrador','Síndico']}
        component={() => <AccountRegister type="edit" />}
      />
      <PrivateRoute
        exact
        path="/app/contas/view/:id"
        permission={['Administrador', 'Síndico', 'Proprietário', 'Morador']}
        component={() => <AccountRegister type="view" />}
      />
      
      <PrivateRoute
        exact
        path="/app/condominios"
        permission={['Administrador', 'Síndico']}
        component={() => <Condominiums />}
      />
      <PrivateRoute
        exact
        path="/app/condominios/add"
        permission={['Administrador']}
        component={() => <CondominiumRegister type="create" />}
      />
      <PrivateRoute
        exact
        path="/app/condominios/edit/:id"
        permission={['Administrador']}
        component={() => <CondominiumRegister type="edit" />}
      />
      <PrivateRoute
        exact
        path="/app/condominios/view/:id"
        permission={['Administrador', 'Síndico']}
        component={() => <CondominiumRegister type="view" />}
      />

      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </HashRouter>
);

export default Routes;