import React, { useContext, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { AppContext } from './context/AppContext';

import Navbar from './component/Navbar/Navbar';
import AddProject from './component/Project/AddProject';
import ProjectList from './component/Project/ProjectList';
import AddResource from './component/Resource/AddResource';
import ResourceList from './component/Resource/ResourceList';
import { fetchProjects } from './context/ProjectActions';
import { fetchResources } from './context/ResourceActions';
import Login from './component/Login';
import Logout from './component/Logout';
import { LOGIN, SET_LOADING } from './context/type';

function App() {
  const [state, dispatch] = useContext(AppContext);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggin');
    if (isLoggedIn) {
      dispatch({ type: LOGIN });
    }
    dispatch({ type: SET_LOADING });
    fetchProjects(dispatch);
    fetchResources(dispatch);
  }, []);

  const isLoggedIn = state.isLoggedIn;
  const isLoading = state.isLoading;

  return (
    <Router>
      {!isLoggedIn ? (
        <Login />
      ) : (
        <>
          <Navbar />
          <div className="page-wrapper">
            <div className="content container-fluid">
              <Switch>
                <Route path="/" exact component={ProjectList} />
                <Route path="/add-resource" exact component={AddResource} />
                <Route path="/resource-list" exact component={ResourceList} />
                <Route path="/add-project" exact component={AddProject} />
                <Route path="/project-list" exact component={ProjectList} />
                <Route path="/logout" exact component={Logout} />
              </Switch>
            </div>
          </div>

          {isLoading && (
            <div className="loader">
              <div
                className="spinner-border"
                role="status"
                aria-hidden="true"
              ></div>
            </div>
          )}
        </>
      )}
    </Router>
  );
}

export default App;
