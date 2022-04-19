import React from 'reactn'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { init } from "./initGlobals";

import PrivateRoute from './components/Auth/PrivateRoute';
import CustomerRoute from './components/Auth/CustomerRoute';
import AdminRoute from './components/Auth/AdminRoute';
import AuthLayout from "./layouts/Auth.js";

import AdminDashboard from './components/Admin/Dashboard'
import AddCustomerService from 'components/Admin/AddCustomerService';
import DeleteCustomerService from 'components/Admin/DeleteCustomerService';
import AddAdmin from 'components/Admin/AddAdmin';
import DeleteAdmin from 'components/Admin/DeleteAdmin';

import CustomerDashboard from 'components/Customer/Dashboard';
import AddCompany from 'components/Customer/AddCompany'
import EditCompany from 'components/Customer/EditCompany';
import CompanyList from 'components/Customer/CompanyList'
import ChangePassword from 'components/Customer/ChangePassword';

import './App.css'
import { Redirect } from 'react-router-dom';

const queryClient = new QueryClient();

init();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>

          <CustomerRoute path="/customer/home" component={CustomerDashboard} />
          <CustomerRoute path="/customer/create-company" component={AddCompany} />
          <CustomerRoute path="/customer/edit-company" component={EditCompany} />
          <CustomerRoute path="/customer/list-company" component={CompanyList} />
          <CustomerRoute path="/customer/password-change" component={ChangePassword} />

          <Route path="/customer/login" component={AuthLayout}/>
          <Redirect from="/customer" to="/customer/home" />

          <AdminRoute path="/admin/home" component={AdminDashboard} />
          <AdminRoute path="/admin/add-cs" component={AddCustomerService} />
          <AdminRoute path="/admin/delete-cs" component={DeleteCustomerService} />
          <AdminRoute path="/admin/add-admin" component={AddAdmin} />
          <AdminRoute path="/admin/delete-admin" component={DeleteAdmin} />

          <Route path="/admin/login" component={AuthLayout} />
          <Redirect from="/admin" to="/admin/home" />

          <Route exact path="/" component={AuthLayout} />
          <PrivateRoute path="*" />

        </Switch>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
