import { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import './task.scss';

export default class Task extends Component {
  state = {
    editingDescription: this.props.task.description,
  };

  static propTypes = {
    task: PropTypes.object.isRequired,
    onComplete: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onEditFinished: PropTypes.func.isRequired,
  };

  onDescriptionChange = (event) => {
    this.setState({ editingDescription: event.target.value });
  };

  onEditFinished = (event) => {
    this.props.onEditFinished(this.state.editingDescription);

    event.preventDefault();
  };

  render() {
    const { task, onComplete, onDelete, onEdit } = this.props;
    let classList = ['task'];
    if (task.completed) {
      classList.push('task--completed');
    }
    if (task.editing) {
      classList.push('task--editing');
    }
    return (
      <li className={classList.join(' ')}>
        <div className="task__view">
          <input
            onChange={() => onComplete(task.id)}
            className="task__toggle"
            type="checkbox"
            checked={Boolean(task.completed)}
          />
          <label>
            <span className="task__description">{task.description}</span>
            <span className="task__created">
              created{' '}
              {formatDistanceToNow(task.created, {
                addSuffix: true,
                includeSeconds: true,
              })}
            </span>
          </label>
          <button onClick={() => onEdit(task.id)} className="task__icon task__icon--edit"></button>
          <button onClick={() => onDelete(task.id)} className="task__icon task__icon--destroy"></button>
        </div>
        <form onSubmit={this.onEditFinished}>
          <input
            type="text"
            className={task.editing ? 'task__edit-field' : 'hidden'}
            onChange={this.onDescriptionChange}
            value={this.state.editingDescription}
          />
        </form>
      </li>
    );
  }
}
