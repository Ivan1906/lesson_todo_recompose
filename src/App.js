import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AddTodo } from './comonents/AddTodo';
import { NavBar } from './comonents/NavBar';
import { ListTodos } from './comonents/ListTodos';
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      counter: 1,
    };
  }

  onKeyDown = event => {
    let { todos, counter } = this.state;
    let todo = {
      id: counter,
      text: event.currentTarget.value,
      type: 'new',
    };
    todos.push(todo);

    this.setState(() => ({
      todos: todos,
      counter: ++counter,
    }));
  };

  onChange = event => {
    let id = event.currentTarget.parentElement.getAttribute('id');

    let newTodos = this.state.todos.map(todo =>
      todo.id.toString() === id
        ? {
            ...todo,
            type: todo.type === 'new' ? 'completed' : 'new',
          }
        : todo,
    );
    this.setState(({ todos }) => ({ todos: newTodos }));
  };

  onDelete = event => {
    let id = event.currentTarget.parentElement.getAttribute('id');

    let newTodos = this.state.todos.filter(todo => (todo.id.toString() !== id ? todo : null));
    this.setState(state => ({ todos: newTodos }));
  };

  render() {
    let { todos } = this.state;

    return (
      <Router>
        <div className="wrapper">
          <div className="container">
            <AddTodo onKeyDown={this.onKeyDown} />
            <NavBar />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <ListTodos
                    {...props}
                    todos={todos}
                    onChange={this.onChange}
                    onDelete={this.onDelete}
                  />
                )}
              />

              <Route
                path="/new"
                render={props => (
                  <ListTodos
                    {...props}
                    todos={todos}
                    onChange={this.onChange}
                    onDelete={this.onDelete}
                  />
                )}
              />

              <Route
                path="/completed"
                render={props => (
                  <ListTodos
                    {...props}
                    todos={todos}
                    onChange={this.onChange}
                    onDelete={this.onDelete}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
