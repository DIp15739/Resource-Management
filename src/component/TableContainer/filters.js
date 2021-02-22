import React from 'react';
import Select from 'react-select';

export const Filter = ({ column }) => {
  return (
    <div style={{ marginTop: 5 }}>
      {column.canFilter && column.render('Filter')}
    </div>
  );
};

export const DefaultColumnFilter = ({
  column: {
    filterValue,
    setFilter,
    preFilteredRows: { length },
    Header,
  },
}) => {
  const phone = Header.toLowerCase().includes('phone');
  return (
    <input
      type={phone ? 'tel' : 'text'}
      value={filterValue || ''}
      className="form-control inputBorder"
      maxLength={phone ? '10' : ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Filter By ${Header}`}
    />
  );
};

export const MultiSelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id, Header },
}) => {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      row.original[id]?.map((tech) => {
        options.add(tech);
      });
    });
    const ops = [];
    options.forEach((o) => ops.push({ label: o, value: o }));
    return ops;
  }, [id, preFilteredRows]);

  const filter = filterValue?.map((val) => ({ label: val, value: val }));
  return (
    <Select
      isMulti
      placeholder={`Filter By ${Header}`}
      value={filter || undefined}
      onChange={(e) => {
        const filter = e.map((x) => x.value);
        setFilter(filter || undefined);
      }}
      options={options}
      blurInputOnSelect={false}
    />
  );
};

export const MultiValueFilterMethod = (filter, row, value) => {
  return filter.filter((f) => value.every((r) => f.original[row]?.includes(r)));
};

export const multiValueCellRender = ({ row: { original }, column: { id } }) => {
  return original[id] ? (
    <select className="custom-select">
      {original[id]?.map((val) => (
        <option key={val}>{val}</option>
      ))}
    </select>
  ) : (
    '-'
  );
};

export const actionRender = ({ row: { original } }, setProject) => {
  return (
    <a
      href="#"
      className="btn float-none"
      data-toggle="modal"
      data-target="#view-profile"
      onClick={() => {
        setProject(original);
      }}
    >
      <i className="fas fa-street-view text-dark"></i>
    </a>
  );
};
