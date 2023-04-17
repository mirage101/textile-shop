import React from "react";
import { NavLink } from "react-router-dom";
const UserMenu = () => {
  return (
    <div>
      <div className="text-center dashboard-menu">
        <div className="list-group">
          <h4>User Dashboard</h4>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Your Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
          >
            Your Orders
          </NavLink>
          <NavLink
            to="/dashboard/user/wishlist"
            className="list-group-item list-group-item-action"
          >
            Your Wishlist
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
