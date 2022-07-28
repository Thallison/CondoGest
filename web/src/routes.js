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
import Standards from "./pages/standard/Standards";
import StandardRegister from "./pages/standard/StandardRegister";
import Companies from "./pages/company/Companies";
import Sectors from "./pages/company/Sectors";
import SectorStandardRegister from "./pages/company/SectorStandardRegister";
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
        permission={"Administrador"}
        component={() => <Users />}
      />
      <PrivateRoute
        exact
        path="/app/usuarios/add"
        permission={"Administrador"}
        component={() => <UserRegister type="create" />}
      />
      <PrivateRoute
        exact
        path="/app/usuarios/edit/:id"
        permission={"Administrador"}
        component={() => <UserRegister type="edit" />}
      />
      <PrivateRoute
        exact
        path="/app/usuarios/view/:id"
        permission={"user_view"}
        component={() => <UserRegister type="view" />}
      />
      <PrivateRoute
        exact
        path="/app/perfil"
        component={() => <UserProfile />}
      />

      <PrivateRoute
        exact
        path="/app/normas"
        permission={"standards"}
        component={() => <Standards />}
      />
      <PrivateRoute
        exact
        path="/app/normas/add"
        permission={"standard_create"}
        component={() => <StandardRegister type="create" />}
      />
      <PrivateRoute
        exact
        path="/app/normas/edit/:id"
        permission={"standard_edit"}
        component={() => <StandardRegister type="edit" />}
      />
      <PrivateRoute
        exact
        path="/app/normas/view/:id"
        permission={"standard_view"}
        component={() => <StandardRegister type="view" />}
      />

      <PrivateRoute
        exact
        path="/app/empresas"
        permission={"companies"}
        component={() => <Companies />}
      />
      <PrivateRoute
        exact
        path="/app/empresas/add"
        permission={"company_create"}
        component={() => <CompanyRegister type="create" />}
      />
      <PrivateRoute
        exact
        path="/app/empresas/edit/:id"
        permission={"company_edit"}
        component={() => <CompanyRegister type="edit" />}
      />
      <PrivateRoute
        exact
        path="/app/empresas/view/:id"
        permission={"company_view"}
        component={() => <CompanyRegister type="view" />}
      />
      <PrivateRoute
        exact
        path="/app/setores"
        permission={"sectors"}
        component={() => <Sectors />}
      />
      <PrivateRoute
        exact
        path="/app/normas_setor/:id"
        permission={"sectors"}
        component={() => <SectorStandardRegister />}
      />

      <PrivateRoute
        exact
        path="/app/permissoes"
        permission={"permission"}
        component={() => <Permissions />}
      />
      <PrivateRoute
        exact
        path="/app/permissoes_perfil/:id"
        permission={"permission"}
        component={() => <RolePermissionsRegister />}
      />

      <PrivateRoute
        exact
        path="/app/vistorias"
        permission={"inspections"}
        component={() => <Inspections />}
      />
      <PrivateRoute
        exact
        path="/app/vistorias/add"
        permission={"inspection_create"}
        component={() => <InspectionRegister type="create" />}
      />
      <PrivateRoute
        exact
        path="/app/vistorias/edit/:id"
        permission={"inspection_edit"}
        component={() => <InspectionRegister type="edit" />}
      />
      <PrivateRoute
        exact
        path="/app/vistorias/view/:id"
        permission={"inspection_view"}
        component={() => <InspectionView />}
      />
      <PrivateRoute
        exact
        path="/app/vistorias/add/files/:id"
        permission={"inspection_edit"}
        component={() => <InspectionFiles />}
      />
      <PrivateRoute
        exact
        path="/app/vistorias/detalhes/:id"
        permission={"inspection_view"}
        component={() => <InspectionDetails />}
      />

      <PrivateRoute
        exact
        path="/app/relatorios/ultimas_vistorias"
        permission={"inspections"}
        component={() => <LastInspections />}
      />

      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </HashRouter>
);

export default Routes;
