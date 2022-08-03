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
import Companies from "./pages/company/Companies";
import Sectors from "./pages/company/Sectors";
import SectorAccountRegister from "./pages/company/SectorAccountRegister";
import CompanyRegister from "./pages/company/CompanyRegister";
import Permissions from "./pages/users/Permissions";
import RolePermissionsRegister from "./pages/users/RolePermissionsRegister";
import Inspections from "./pages/inspection/Inspections";
import InspectionView from "./pages/inspection/InspectionView";
import InspectionRegister from "./pages/inspection/InspectionRegister";
import InspectionDetails from "./pages/inspection/InspectionDetails";
import InspectionFiles from "./pages/inspection/InspectionFiles";
import LastInspections from "./pages/reports/LastInspections";

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
        permission={["Administrador"]}
        component={() => <Users />}
      />
      <PrivateRoute
        exact
        path="/app/usuarios/add"
        permission={["Administrador"]}
        component={() => <UserRegister type="create" />}
      />
      <PrivateRoute
        exact
        path="/app/usuarios/edit/:id"
        permission={["Administrador"]}
        component={() => <UserRegister type="edit" />}
      />
      <PrivateRoute
        exact
        path="/app/usuarios/view/:id"
        permission={["Administrador"]}
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
        permission={["Administrador"]}
        component={() => <Accounts />}
      />
      <PrivateRoute
        exact
        path="/app/contas/add"
        permission={["Administrador"]}
        component={() => <AccountRegister type="create" />}
      />
      <PrivateRoute
        exact
        path="/app/contas/edit/:id"
        permission={["Administrador"]}
        component={() => <AccountRegister type="edit" />}
      />
      <PrivateRoute
        exact
        path="/app/contas/view/:id"
        permission={["Administrador"]}
        component={() => <AccountRegister type="view" />}
      />
      
      <PrivateRoute
        exact
        path="/app/condominios"
        permission={["Administrador"]}
        component={() => <Condominiums />}
      />
      <PrivateRoute
        exact
        path="/app/condominios/add"
        permission={["Administrador"]}
        component={() => <CondominiumRegister type="create" />}
      />
      <PrivateRoute
        exact
        path="/app/condominios/edit/:id"
        permission={["Administrador"]}
        component={() => <CondominiumRegister type="edit" />}
      />
      <PrivateRoute
        exact
        path="/app/condominios/view/:id"
        permission={["Administrador"]}
        component={() => <CondominiumRegister type="view" />}
      />

      <PrivateRoute
        exact
        path="/app/empresas"
        permission={["Administrador"]}
        component={() => <Companies />}
      />
      <PrivateRoute
        exact
        path="/app/empresas/add"
        permission={["Administrador"]}
        component={() => <CompanyRegister type="create" />}
      />
      <PrivateRoute
        exact
        path="/app/empresas/edit/:id"
        permission={["Administrador"]}
        component={() => <CompanyRegister type="edit" />}
      />
      <PrivateRoute
        exact
        path="/app/empresas/view/:id"
        permission={["Administrador"]}
        component={() => <CompanyRegister type="view" />}
      />
      <PrivateRoute
        exact
        path="/app/setores"
        permission={["Administrador"]}
        component={() => <Sectors />}
      />
      <PrivateRoute
        exact
        path="/app/normas_setor/:id"
        permission={["Administrador"]}
        component={() => <SectorAccountRegister />}
      />

      <PrivateRoute
        exact
        path="/app/permissoes"
        permission={["Administrador"]}
        component={() => <Permissions />}
      />
      <PrivateRoute
        exact
        path="/app/permissoes_perfil/:id"
        permission={["Administrador"]}
        component={() => <RolePermissionsRegister />}
      />

      <PrivateRoute
        exact
        path="/app/vistorias"
        permission={["Administrador"]}
        component={() => <Inspections />}
      />
      <PrivateRoute
        exact
        path="/app/vistorias/add"
        permission={["Administrador"]}
        component={() => <InspectionRegister type="create" />}
      />
      <PrivateRoute
        exact
        path="/app/vistorias/edit/:id"
        permission={["Administrador"]}
        component={() => <InspectionRegister type="edit" />}
      />
      <PrivateRoute
        exact
        path="/app/vistorias/view/:id"
        permission={["Administrador"]}
        component={() => <InspectionView />}
      />
      <PrivateRoute
        exact
        path="/app/vistorias/add/files/:id"
        permission={["Administrador"]}
        component={() => <InspectionFiles />}
      />
      <PrivateRoute
        exact
        path="/app/vistorias/detalhes/:id"
        permission={["Administrador"]}
        component={() => <InspectionDetails />}
      />

      <PrivateRoute
        exact
        path="/app/relatorios/ultimas_vistorias"
        permission={["Administrador"]}
        component={() => <LastInspections />}
      />

      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </HashRouter>
);

export default Routes;
