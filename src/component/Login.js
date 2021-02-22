import React, { useContext, useState } from 'react';

import { AppContext } from '../context/AppContext';

import TextInput from './Input/TextInput';
import { signin, signup } from '../context/LoginActions';
const Login = () => {
  const [state, dispatch] = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [switchTo, setSwitchTo] = useState(false);

  const onError = (err) => {
    if (err) setError(err);
    else setError('Invalid Username or Password');
    setLoading(false);
  };

  const validation = (field, value) => {
    let error;
    switch (field) {
      case 'username':
      case 'password':
        if (!value) {
          error = `Please enter valid ${field}`;
        } else error = '';
        break;

      default:
        error = '';
        break;
    }
    setFormError((pre) => ({ ...pre, [field]: error }));
    return error;
  };

  const isvalidForm = () => {
    let err = false;
    if (validation('username', username)) err = true;
    if (validation('password', password)) err = true;
    if (!err) return true;
    return false;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setError(null);
    if (!isvalidForm(e)) return false;
    setLoading(true);

    if (!switchTo) {
      signin(username, password, dispatch, onError);
    } else {
      signup(username, password, dispatch, onError);
    }
  };
  return (
    <div className="loginCenter">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-7 mx-auto">
            <form onSubmit={submitHandler}>
              <h2>{!switchTo ? 'Login' : 'Signup'}</h2>
              {error && (
                <div
                  className="comment alert alert-danger"
                  style={{ textAlign: 'center' }}
                >
                  {error}
                </div>
              )}
              <TextInput
                label="Username"
                placeholder="Enter username"
                name="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  validation(e.target.name, e.target.value);
                }}
                autoComplete="username"
                error={formError.username}
                require
              />
              <TextInput
                label="Password"
                type="password"
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validation(e.target.name, e.target.value);
                }}
                autoComplete="current-password"
                error={formError.password}
                require
              />

              <div className="form-group text-center">
                <button
                  type="submit"
                  className="btn add-btn float-none"
                  disabled={loading}
                >
                  {loading && (
                    <span
                      className="spinner-border spinner-border-sm mr-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                  {!switchTo ? 'Login' : 'Signup'}
                </button>
              </div>
              {/* <div className="form-group text-center">
                <button
                  type="button"
                  className="btn add-btn float-none"
                  onClick={() => setSwitchTo(!switchTo)}
                >
                  Switch to {switchTo ? 'Login' : 'Signup'}
                </button>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
