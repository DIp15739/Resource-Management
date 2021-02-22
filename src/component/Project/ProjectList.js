import React, { useContext, useState } from 'react';

import { AppContext } from '../../context/AppContext';
import ProjectForm from './ProjectForm';
import Header from '../Header/Header';
import CustomModal from '../Modal/CustomModal';

import {
  actionRender,
  MultiSelectColumnFilter,
  multiValueCellRender,
  MultiValueFilterMethod,
} from '../TableContainer/filters';
import TableContainer from './../TableContainer/TableContainer';

const ProjectList = () => {
  const [state] = useContext(AppContext);
  const [project, setProject] = useState();

  const columns = [
    {
      Header: 'Project Name',
      accessor: 'projectName',
    },
    {
      Header: 'Client Name',
      accessor: 'clientName',
    },
    {
      Header: 'Client Email',
      accessor: 'clientEmail',
      disableFilters: true,
    },
    {
      Header: 'Client Phone No',
      accessor: 'clientPhone',
    },
    {
      Header: 'Technologies',
      accessor: 'technologies',
      Cell: multiValueCellRender,
      Filter: MultiSelectColumnFilter,
      filter: MultiValueFilterMethod,
    },
    {
      Header: 'Resource',
      accessor: 'resource',
      Cell: multiValueCellRender,
      Filter: MultiSelectColumnFilter,
      filter: MultiValueFilterMethod,
    },
    {
      Header: 'Notes',
      accessor: 'notes',
    },
    {
      Header: 'Actions',
      Cell: (props) => actionRender(props, setProject),
      disableSortBy: true,
      minWidth: 'auto',
    },
  ];

  return (
    <div>
      <Header
        title="Project List"
        Button={() => {
          return (
            <a
              href="#"
              className="btn add-btn"
              data-toggle="modal"
              data-target="#add-project"
            >
              <i className="fa fa-plus"></i> Add Project
            </a>
          );
        }}
      />
      <TableContainer columns={columns} data={state.projects} />
      <CustomModal id="add-project" title="Add Project" Body={ProjectForm} />
      <CustomModal
        id="view-profile"
        title="View Project"
        Body={() => <ProjectForm project={project} />}
      />
    </div>
  );
};

export default ProjectList;
