import React from 'react';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <ul className="menu">
      <li>
        <Link to="/">All</Link>
      </li>
      <li>
        <Link to="/new">News</Link>
      </li>
      <li>
        <Link to="/completed">Completed</Link>
      </li>
    </ul>
  );
};
