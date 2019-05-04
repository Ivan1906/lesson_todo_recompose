import React from 'react';
import PropTypes from 'prop-types';
import ItemTodo from './ItemTodo';

export const ListTodos = ({ match, todos, onChange, onDelete }) => {
  if (match.path === '/new') {
    todos = todos.filter(todo => (todo.type === 'new' ? todo : null));
  } else if (match.path === '/completed') {
    todos = todos.filter(todo => (todo.type === 'completed' ? todo : null));
  }

  return (
    <React.Fragment>
      {todos.map(todo => {
        return <ItemTodo key={todo.id} todo={todo} onChange={onChange} onDelete={onDelete} />;
      })}
    </React.Fragment>
  );
};

ListTodos.defaultProps = {
  todos: [],
  onChange: () => console.log('Missing parameter onChange!'),
  onDelete: () => console.log('Missing parameter onDelete!'),
};

ListTodos.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['new', 'completed']).isRequired,
    }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
