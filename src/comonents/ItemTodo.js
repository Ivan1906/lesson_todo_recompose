import React from "react";
import {
  compose,
  withHandlers,
  defaultProps,
  setPropTypes,
  lifecycle
} from "recompose";
import PropTypes from "prop-types";

function ItemTodo({ todo, onChange, onDelete }) {
  return (
    <div className="todo" id={todo.id}>
      <input
        type="checkbox"
        onClick={onChange}
        defaultChecked={todo.type === "completed" ? true : false}
      />

      <span>{todo.text}</span>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

const enhance = compose(
  setPropTypes({
    todo: PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["new", "completed"]).isRequired
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  }),
  defaultProps({
    todo: {
      id: 0,
      text: "No todo element",
      type: "new"
    },
    onChange: () => console.log("Missing parameter onChange!"),
    onDelete: () => console.log("Missing parameter onDelete!")
  }),
  lifecycle({
    shouldComponentUpdate(nextProps) {
      return this.props.todo.type !== nextProps.todo.type;
    }
  }),
  withHandlers({
    onChange: props => event => {
      props.onChange(event);
    },
    onDelete: props => event => {
      props.onDelete(event);
    }
  })
);

export const ItemTodoEnhance = enhance(ItemTodo);
