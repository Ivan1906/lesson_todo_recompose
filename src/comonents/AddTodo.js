import React from 'react';
import PropTypes from 'prop-types';

export const AddTodo = ({ onKeyDown }) => {
  let keyDown = event => {
    if (event.keyCode === 13) {
      onKeyDown(event);
      event.currentTarget.value = '';
    }
  };
  return <input type="text" onKeyDown={keyDown} placeholder="Add text Todo" />;
};

AddTodo.defaultPropsef = {
  onKeyDown: () => console.log('Missing parameter onKeyDown!'),
};

AddTodo.propTypes = {
  onKeyDown: PropTypes.func.isRequired,
};
