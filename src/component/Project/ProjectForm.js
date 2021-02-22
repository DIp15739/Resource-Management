import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';

import TextInput from '../Input/TextInput';
import TagInput from '../Input/TagInput';
import {
  createProject,
  deleteProject,
  updateProject,
} from '../../context/ProjectActions';
import SelectInput from '../Input/SelectInput';

const initialValue = {
  projectName: '',
  clientName: '',
  clientEmail: '',
  clientPhone: '',
  technologies: [],
  resource: [],
  notes: '',
};

const ProjectForm = (props) => {
  const [state, dispatch] = useContext(AppContext);
  const [project, setProject] = useState(initialValue);
  const [formError, setFormError] = useState({});
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.project) {
      const proj = { ...props.project };
      proj.technologies = proj.technologies?.map((tech) => ({
        label: tech,
        value: tech,
      }));
      proj.resource = proj.resource?.map((res) => ({
        label: res,
        value: res,
      }));
      setProject(proj);
    }
  }, []);

  const techOptions = () => {
    const options = new Set();
    state.projects?.map((proj) =>
      proj.technologies?.map((tech) => options.add(tech))
    );
    return [...options.values()].map((op) => ({ label: op, value: op }));
  };

  const getResourceOptions = () => {
    const options = new Set();
    state.resources?.map((res) => options.add(res.name));

    return [...options.values()].map((op) => ({ label: op, value: op }));
  };

  const inputChangeHandler = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
    validation(e.target.name, e.target.value);
  };

  const tagInputChangeHandler = (values, meta) => {
    setProject({ ...project, [meta.name]: values });
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
        const res = { class: 'success', message: 'Project added successfuly.' };
        setResponse(res);
        setProject(initialValue);
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
      case 'projectName':
        if (!value) {
          error = `Please enter valid project name`;
        } else error = '';
        break;
      case 'clientName':
        if (!value) {
          error = `Please enter valid client name`;
        } else error = '';
        break;

      case 'technologies':
        if (!value.length) {
          error = 'Please select technologies';
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
    for (let i in project) {
      if (validation(i, project[i])) err = true;
    }
    if (!err) return true;
    console.log(formError);
    return false;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!isvalidForm(e)) return false;
    setLoading(true);

    const data = { ...project };

    data.technologies = data.technologies.map((tech) => tech.value);
    data.resource = data.resource.map((res) => res.value);

    if (props.project) {
      updateProject(data, dispatch, (err) => callback('update', err));
    } else {
      createProject(data, dispatch, (err) => callback('create', err));
    }
  };

  const deleteHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    deleteProject(project.id, dispatch, (err) => callback('delete', err));
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="row">
        <div className="col-sm-6">
          <TextInput
            label="Project Name"
            name="projectName"
            placeholder="Enter project name"
            value={project.projectName}
            onChange={inputChangeHandler}
            error={formError.projectName}
            require
          />
        </div>
        <div className="col-sm-6">
          <TextInput
            label="Client Name"
            type="text"
            name="clientName"
            placeholder="Enter client name"
            value={project.clientName}
            onChange={inputChangeHandler}
            error={formError.clientName}
            require
          />
        </div>
        <div className="col-sm-6">
          <TextInput
            type="tel"
            label="Client Email"
            name="clientEmail"
            placeholder="Enter client email address"
            value={project.clientEmail}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="col-sm-6">
          <TextInput
            type="tel"
            label="Client Phone No"
            name="clientPhone"
            placeholder="Enter client phone number"
            minLength="10"
            maxLength="10"
            value={project.clientPhone}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="col-sm-6">
          <TagInput
            label="Technologies"
            name="technologies"
            placeholder="Enter technologies"
            value={project.technologies}
            onChange={tagInputChangeHandler}
            options={techOptions()}
            error={formError.technologies}
            require
          />
        </div>
        <div className="col-sm-6">
          <SelectInput
            label="Resource"
            name="resource"
            placeholder="Enter resource name"
            value={project.resource}
            onChange={tagInputChangeHandler}
            options={getResourceOptions()}
            isMulti
          />
        </div>
        <div className="col-sm-6">
          <TextInput
            label="Notes"
            name="notes"
            type="text"
            placeholder="Remarks"
            value={project.notes}
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
          {props.project ? (
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

export default ProjectForm;
