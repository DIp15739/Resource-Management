import React from 'react';

const CustomModal = ({ id, title, Body }) => {
  return (
    <div
      id={id}
      className="modal custom-modal fade"
      role="dialog"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body px-4">
            <Body />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
