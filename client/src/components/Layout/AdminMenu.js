import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group dashboard-menu">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/banner"
            className="list-group-item list-group-item-action"
          >
            Create Banner
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
          >
            Update Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink>
          <NavLink
            to="/dashboard/admin/infopages"
            className="list-group-item list-group-item-action"
          >
            Info pages
          </NavLink>
          <NavLink
            to="/dashboard/admin/paymethods"
            className="list-group-item list-group-item-action"
          >
            Payment Methods
          </NavLink>
          <NavLink
            to="/dashboard/admin/shippingmethods"
            className="list-group-item list-group-item-action"
          >
            Shipping Methods
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
