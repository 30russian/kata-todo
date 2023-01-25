import { Component } from 'react';

import { formatDistanceToNow } from 'date-fns';

import PropTypes from 'prop-types';

export default class Task extends Component {
  static propTypes = {
    task: PropTypes.object.isRequired,
    onComplete: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  };

  render() {
    const { task, onComplete, onDelete } = this.props;
    return (
      <li className={task.completed ? "completed" : undefined}>
        <div className="view">
          <input onChange={() => onComplete(task.id)} className="toggle" type="checkbox" checked={Boolean(task.completed)} />
          <label>
            <span className="description">{task.description}</span>
            <span className="created">created {formatDistanceToNow(task.created, {addSuffix: true, includeSeconds: true})}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button onClick={() => onDelete(task.id)} className="icon icon-destroy"></button>
        </div>
      </li>
    );
  }
};