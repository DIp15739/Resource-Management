import React from 'react';
import Select from 'react-select';

const SelectInput = ({ label, require, error, ...restProps }) => {
  return (
    <div className="form-group">
      {label && (
        <label className="col-form-label">
          {label} {require && <span className="text-danger">*</span>}
        </label>
      )}
      <Select blurInputOnSelect={false} {...restProps} />
      {error && (
        <label
          className="text-danger pl-3"
          dangerouslySetInnerHTML={{ __html: error }}
        ></label>
      )}
    </div>
  );
};

export default SelectInput;
