import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { LOGOUT } from '../context/type';

const Logout = (props) => {
  const [state, dispatch] = useContext(AppContext);
  useEffect(() => {
    dispatch({ type: LOGOUT });
    localStorage.removeItem('isLoggin');
    props.history.push('/');
  }, []);
  return <div>Logout</div>;
};

export default Logout;
