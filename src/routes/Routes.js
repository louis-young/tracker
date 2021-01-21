import React from "react";

import { Switch, Route } from "react-router-dom";

import { ROUTES } from "../constants/constants";

import Dashboard from "../pages/Dashboard/Dashboard";

import ClientActions from "../components/clients/ClientActions/ClientActions";
import Client from "../pages/Clients/Client/Client";
import Clients from "../pages/Clients/Clients";

import DomainActions from "../components/domains/DomainActions/DomainActions";
import Domain from "../pages/Domains/Domain/Domain";
import Domains from "../pages/Domains/Domains";

import DocumentActions from "../components/documentation/DocumentActions/DocumentActions";
import Document from "../pages/Documentation/Document/Document";
import Documentation from "../pages/Documentation/Documentation";

const ACTIONS = {
  ADD: "/add",
  EDIT: "/:id/edit",
  VIEW: "/:id",
};

const Routes = () => {
  return (
    <Switch>
      <Route path={ROUTES.DASHBOARD} exact component={Dashboard} />

      <Route path={`${ROUTES.CLIENTS}${ACTIONS.ADD}`} component={ClientActions} />
      <Route path={`${ROUTES.CLIENTS}${ACTIONS.EDIT}`} component={ClientActions} />
      <Route path={`${ROUTES.CLIENTS}${ACTIONS.VIEW}`} component={Client} />
      <Route path={ROUTES.CLIENTS} component={Clients} />

      <Route path={`${ROUTES.DOMAINS}${ACTIONS.ADD}`} component={DomainActions} />
      <Route path={`${ROUTES.DOMAINS}${ACTIONS.EDIT}`} component={DomainActions} />
      <Route path={`${ROUTES.DOMAINS}${ACTIONS.VIEW}`} component={Domain} />
      <Route path={ROUTES.DOMAINS} component={Domains} />

      <Route path={`${ROUTES.DOCUMENTATION}${ACTIONS.ADD}`} component={DocumentActions} />
      <Route path={`${ROUTES.DOCUMENTATION}${ACTIONS.EDIT}`} component={DocumentActions} />
      <Route path={`${ROUTES.DOCUMENTATION}${ACTIONS.VIEW}`} component={Document} />
      <Route path={ROUTES.DOCUMENTATION} component={Documentation} />
    </Switch>
  );
};

export default Routes;
