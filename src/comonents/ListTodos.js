import React from "react";
import PropTypes from "prop-types";
import {
  compose,
  withHandlers,
  defaultProps,
  setPropTypes,
  mapProps
} from "recompose";

import { ItemTodoEnhance } from "./ItemTodo";

function ListTodos({ match, todos, onChange, onDelete }) {
  return (
    <React.Fragment>
      {todos.map(todo => {
        return (
          <ItemTodoEnhance
            key={todo.id}
            todo={todo}
            onChange={onChange}
            onDelete={onDelete}
          />
        );
      })}
    </React.Fragment>
  );
}

const enhance = compose(
  setPropTypes({
    todos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        type: PropTypes.oneOf(["new", "completed"]).isRequired
      })
    ).isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  }),
  defaultProps({
    todos: [],
    onChange: () => console.log("Missing parameter onChange!"),
    onDelete: () => console.log("Missing parameter onDelete!")
  }),
  mapProps(props => {
    let { todos, match } = props;
    let type = match.path.substring(1);
    todos = todos.filter(todo =>
      match.path === "/" || todo.type === type ? todo : null
    );
    return {
      ...props,
      todos
    };
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

export const ListTodosEnhance = enhance(ListTodos);
