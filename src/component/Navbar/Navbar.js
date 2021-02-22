import React, { useEffect } from 'react';
import './Navbar.css';

import { Link } from 'react-router-dom';
import $ from 'jquery';

const Navbar = () => {
  useEffect(() => {
    $('.sidebar-toggler').on('click', () => {
      $('body').toggleClass('show-sidebar');
    });
    $('.overlay, .sidebar-menu ul >li').on('click', () => {
      if ($(window).width() < 992) $('body').removeClass('show-sidebar');
    });
    $(window).on('resize', () => {
      if ($(window).width() < 992) $('body').removeClass('show-sidebar');
      else $('body').addClass('show-sidebar');
    });
    if ($(window).width() > 992) $('body').addClass('show-sidebar');
  }, []);

  return (
    <nav className="navbar navbar-expand-lg header">
      <div>
        <button className="sidebar-toggler" type="button">
          <i className="fa fa-bars"></i>
        </button>
        <Link className="navbar-brand" to="/">
          Resource Management
        </Link>
      </div>

      <div className="overlay"></div>
      <div className="sidebar">
        <div className="sidebar-menu">
          <ul>
            <li>
              <Link to="/project-list">
                <i className="fa fa-project-diagram"></i>
                <span>Project List</span>
              </Link>
            </li>
            <li>
              <Link to="/resource-list">
                <i className="fa fa-user"></i>
                <span>Resource List</span>
              </Link>
            </li>

            <li>
              <Link to="/add-project">
                <i className="fa fa-rocket"></i>
                <span>Add Project</span>
              </Link>
            </li>
            <li>
              <Link to="/add-resource">
                <i className="fa fa-users"></i>
                <span>Add Resource</span>
              </Link>
            </li>

            <li>
              <Link to="/logout">
                <i className="fa fa-power-off"></i>
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
