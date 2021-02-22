import React from 'react';
import CreatableSelect from 'react-select/creatable';

const TagInput = ({ label, require, error, ...restProps }) => {
  return (
    <div className="form-group">
      {label && (
        <label className="col-form-label">
          {label} {require && <span className="text-danger">*</span>}
        </label>
      )}
      <CreatableSelect
        isMulti
        noOptionsMessage={({ inputValue }) =>
          inputValue ? `"${inputValue}" is already selected` : 'No options'
        }
        blurInputOnSelect={false}
        captureMenuScrol={true}
        isClearable
        {...restProps}
      />
      {error && (
        <label
          className="text-danger pl-3"
          dangerouslySetInnerHTML={{ __html: error }}
        ></label>
      )}
    </div>
  );
};

export default TagInput;
