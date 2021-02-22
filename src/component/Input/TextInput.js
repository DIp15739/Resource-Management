import React from 'react';

const TextInput = ({ label, require, error, ...restProps }) => {
  return (
    <div className="form-group">
      {label && (
        <label className="col-form-label">
          {label} {require && <span className="text-danger">*</span>}
        </label>
      )}
      <input className="form-control inputBorder" type="text" {...restProps} />
      {error && (
        <label
          className="text-danger pl-3"
          dangerouslySetInnerHTML={{ __html: error }}
        ></label>
      )}
    </div>
  );
};

export default TextInput;
