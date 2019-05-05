import React from "react";
import { compose, withHandlers, defaultProps, setPropTypes } from "recompose";
import PropTypes from "prop-types";

function AddTodo({ onKeyDown }) {
  return (
    <input type="text" onKeyDown={onKeyDown} placeholder="Add text Todo" />
  );
}

const enhance = compose(
  setPropTypes({ onKeyDown: PropTypes.func.isRequired }),
  defaultProps({
    onKeyDown: () => console.log("Missing parameter onKeyDown!")
  }),
  withHandlers({
    onKeyDown: props => event => {
      if (event.keyCode === 13 && event.currentTarget.value.trim() !== "") {
        props.onKeyDown(event);
        event.currentTarget.value = "";
      }
    }
  })
);

export const AddTodoEnhance = enhance(AddTodo);
