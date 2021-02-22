import React from 'react';
import './Header.css';

const Header = ({ title, Button }) => {
  return (
    <div className="page-header">
      <div className="row align-items-center">
        <div className="col">
          <h3 className="page-title">{title}</h3>
        </div>
        <div className="col-auto float-right ml-auto">
          {Button && <Button />}
        </div>
      </div>
    </div>
  );
};

export default Header;
