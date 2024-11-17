import React from 'react';
import PropTypes from 'prop-types';

export const DialogOverlay = ({ children, onClick }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={onClick}>
    {children}
  </div>
);

export const DialogContent = ({ children, onClick }) => (
  <div
    className="bg-white p-6 rounded-lg shadow-lg z-50"
    onClick={(e) => {
      e.stopPropagation(); // Prevents dialog click from closing overlay
      if (onClick) onClick(e);
    }}
  >
    {children}
  </div>
);

DialogOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

DialogContent.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};
