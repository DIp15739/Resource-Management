import React, { useContext, useState } from 'react';

import { AppContext } from '../../context/AppContext';
import ResourceForm from './ResourceForm';
import Header from '../Header/Header';
import CustomModal from '../Modal/CustomModal';

import TableContainer from '../TableContainer/TableContainer';
import {
  actionRender,
  MultiSelectColumnFilter,
  multiValueCellRender,
  MultiValueFilterMethod,
} from '../TableContainer/filters';

const ResourceList = () => {
  const [state] = useContext(AppContext);
  const [resource, setResource] = useState();

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Email',
      accessor: 'email',
      disableFilters: true,
    },
    {
      Header: 'Phone No',
      accessor: 'phone',
    },
    {
      Header: 'Project Name',
      accessor: 'projectName',
      Cell: multiValueCellRender,
      Filter: MultiSelectColumnFilter,
      filter: MultiValueFilterMethod,
    },
    {
      Header: 'Skills',
      accessor: 'skills',
      Cell: multiValueCellRender,
      Filter: MultiSelectColumnFilter,
      filter: MultiValueFilterMethod,
    },
    {
      Header: 'Positions',
      accessor: 'positions',
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
      Cell: (props) => actionRender(props, setResource),
      disableSortBy: true,
    },
  ];

  return (
    <div>
      <Header
        title="Resource List"
        Button={() => {
          return (
            <a
              href="#"
              className="btn add-btn"
              data-toggle="modal"
              data-target="#add-resource"
            >
              <i className="fa fa-plus"></i> Add Resource
            </a>
          );
        }}
      />
      <TableContainer columns={columns} data={state.resources} />
      <CustomModal id="add-resource" title="Add Resource" Body={ResourceForm} />
      <CustomModal
        id="view-profile"
        title="View Resource"
        Body={() => <ResourceForm resource={resource} />}
      />
    </div>
  );
};

export default ResourceList;
