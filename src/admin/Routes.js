import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import RouteWithLayout from "./RouteWithLayout";
import Dashboard from "./Dashboard";
import MainLayout from './AdminMain';
import {Chart} from "../chart/Chart";
import {ProductRegistration} from "./ProductRegistration";
import {Shipping} from "../shipping/Shipping";
import {MemberManagement} from "./MemberManagement";
const Admin = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <RouteWithLayout
        component={Dashboard}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={Map}
        exact
        layout={MainLayout}
        path="/map"
      />
      <RouteWithLayout
        component={MemberManagement}
        exact
        layout={MainLayout}
        path="/memberManagement"
      />
      <RouteWithLayout
        component={Shipping}
        exact
        layout={MainLayout}
        path="/shipping"
      />
      <RouteWithLayout
        component={Chart}
        exact
        layout={MainLayout}
        path="/chart"
      />
      <RouteWithLayout
        component={ProductRegistration}
        exact
        layout={MainLayout}
        path="/productRegistration"
      />
    </Switch>
  );
};

export default Admin;
