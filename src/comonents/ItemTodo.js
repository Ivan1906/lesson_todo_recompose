import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ItemTodo extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.todo.type !== nextProps.todo.type;
  }

  render() {
    let { todo, onChange, onDelete } = this.props;

    return (
      <div className="todo" id={todo.id}>
        <input
          type="checkbox"
          onClick={onChange}
          defaultChecked={todo.type === 'completed' ? true : false}
        />

        <span>{todo.text}</span>
        <button onClick={onDelete}>Delete</button>
      </div>
    );
  }
}

ItemTodo.defaultProps = {
  todo: {
    id: 0,
    text: 'No todo element',
    type: 'new',
  },
  onChange: () => console.log('Missing parameter onChange!'),
  onDelete: () => console.log('Missing parameter onDelete!'),
};

ItemTodo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['new', 'completed']).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
