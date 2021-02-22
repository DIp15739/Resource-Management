import React, { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../context/AppContext';
import {
  createResource,
  deleteResource,
  updateResource,
} from '../../context/ResourceActions';

import TextInput from '../Input/TextInput';
import TagInput from '../Input/TagInput';
import SelectInput from '../Input/SelectInput';

const initialValue = {
  name: '',
  email: '',
  phone: '',
  projectName: [],
  skills: [],
  positions: [],
  notes: '',
};

const ResourceForm = (props) => {
  const [state, dispatch] = useContext(AppContext);
  const [resource, setResource] = useState(initialValue);
  const [formError, setFormError] = useState({});
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.resource) {
      const res = { ...props.resource };
      res.skills = res.skills?.map((skill) => ({
        label: skill,
        value: skill,
      }));
      res.positions = res.positions?.map((pos) => ({
        label: pos,
        value: pos,
      }));
      res.projectName = res.projectName?.map((pname) => ({
        label: pname,
        value: pname,
      }));
      setResource(res);
    }
  }, []);

  const getOptions = (name) => {
    const options = new Set();
    state.resources?.map((res) => res[name]?.map((op) => options.add(op)));

    return [...options.values()].map((op) => ({ label: op, value: op }));
  };

  const getProjectOptions = () => {
    const options = new Set();
    state.projects?.map((proj) => options.add(proj.projectName));

    return [...options.values()].map((op) => ({ label: op, value: op }));
  };

  const inputChangeHandler = (e) => {
    setResource({ ...resource, [e.target.name]: e.target.value });
    validation(e.target.name, e.target.value);
  };

  const tagInputChangeHandler = (values, meta) => {
    setResource({ ...resource, [meta.name]: values });
    validation(meta.name, values);
  };

  const callback = (type, err) => {
    if (err) {
      console.log(err);
      const res = { class: 'danger', message: 'Somthing went wrong!' };
      setResponse(res);
    } else {
      if (type === 'update') {
        document.querySelector('#view-profile .close').click();
      } else if (type === 'create') {
        const res = {
          class: 'success',
          message: 'Resource added successfuly.',
        };
        setResponse(res);
        setResource(initialValue);
      } else {
        document.querySelector('#view-profile .close').click();
      }
    }
    setTimeout(() => {
      setResponse(null);
    }, 5000);
    setLoading(false);
  };

  const validation = (field, value) => {
    let error;
    switch (field) {
      case 'name':
        if (!value) {
          error = 'Please enter valid name';
        } else error = '';
        break;

      case 'email':
        const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailReg.test(value)) {
          error = 'Please enter valid email address';
        } else error = '';
        break;
      case 'phone':
        const phoneReg = /^(\+[0-9]{1,3} )?[0-9]{10}$/;
        if (!phoneReg.test(value)) {
          error = 'Please enter valid phone number';
        } else error = '';
        break;

      case 'skills':
      case 'positions':
        if (!value.length) {
          error = `Please select ${field}`;
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
    for (let i in resource) {
      if (validation(i, resource[i])) err = true;
    }
    if (!err) return true;
    return false;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!isvalidForm(e)) return false;
    setLoading(true);

    const data = { ...resource };
    data.skills = data.skills.map((skill) => skill.value);
    data.positions = data.positions.map((position) => position.value);
    data.projectName = data.projectName.map((projectName) => projectName.value);

    if (props.resource) {
      updateResource(data, dispatch, (err) => callback('update', err));
    } else {
      createResource(data, dispatch, (err) => callback('create', err));
    }
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    deleteResource(resource.id, dispatch, (err) => callback('delete', err));
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="row">
        <div className="col-sm-6">
          <TextInput
            label="Name"
            name="name"
            placeholder="Enter full name"
            value={resource.name}
            onChange={inputChangeHandler}
            error={formError.name}
            require
          />
        </div>
        <div className="col-sm-6">
          <TextInput
            label="Email"
            type="email"
            name="email"
            placeholder="Enter email"
            value={resource.email}
            onChange={inputChangeHandler}
            error={formError.email}
            require
          />
        </div>
        <div className="col-sm-6">
          <TextInput
            type="tel"
            label="Phone No"
            name="phone"
            placeholder="Enter phone number"
            value={resource.phone}
            onChange={inputChangeHandler}
            minLength="10"
            maxLength="10"
            error={formError.phone}
            require
          />
        </div>
        <div className="col-sm-6">
          <SelectInput
            label="Project Name"
            name="projectName"
            placeholder="Enter project name"
            value={resource.projectName}
            onChange={tagInputChangeHandler}
            options={getProjectOptions()}
            isMulti
          />
        </div>
        <div className="col-sm-6">
          <TagInput
            label="Skills"
            name="skills"
            placeholder="Enter Skills"
            value={resource.skills}
            onChange={tagInputChangeHandler}
            options={getOptions('skills')}
            error={formError.skills}
            require
          />
        </div>
        <div className="col-sm-6">
          <TagInput
            label="Positions"
            name="positions"
            placeholder="Enter positions"
            value={resource.positions}
            onChange={tagInputChangeHandler}
            options={getOptions('positions')}
            error={formError.positions}
            require
          />
        </div>
        <div className="col-sm-6">
          <TextInput
            label="Notes"
            name="notes"
            placeholder="Remarks"
            value={resource.notes}
            onChange={inputChangeHandler}
          />
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-lg-6">
          {response && (
            <div
              className={`alert alert-dismissible mb-0 alert-${response.class}`}
            >
              <button type="button" className="close" data-dismiss="alert">
                &times;
              </button>
              {response.message}
            </div>
          )}
        </div>
        <div className="col-lg-6 mt-2">
          {props.resource ? (
            <>
              <button
                type="submit"
                className="btn add-btn submit-btn"
                disabled={loading}
              >
                {loading && (
                  <span
                    className="spinner-border spinner-border-sm mr-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                Update
              </button>
              <button
                type="button"
                className="btn remove-btn submit-btn mr-4"
                onClick={deleteHandler}
                disabled={loading}
              >
                {loading && (
                  <span
                    className="spinner-border spinner-border-sm mr-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                Delete
              </button>
            </>
          ) : (
            <button
              type="submit"
              className="btn add-btn submit-btn"
              disabled={loading}
            >
              {loading && (
                <span
                  className="spinner-border spinner-border-sm mr-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              Submit
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ResourceForm;
