import { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import './Task.scss';

export default class Task extends Component {
  state = {
    editingDescription: this.props.task.description,
  };

  _timer = null;

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

  startTimer() {
    if (!this._timer) {
      this._timer = setTimeout();
    }
  }

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
        <div className='task__view'>
          <input
            id={`task${task.id}-complete-checkbox`}
            onChange={() => onComplete(task.id)}
            className='task__toggle'
            type='checkbox'
            checked={Boolean(task.completed)}
          />
          <label htmlFor={`task${task.id}-complete-checkbox`}>
            <span className='task__title'>{task.description}</span>
            <div className='task__timer'>
              <button className='task__icon task__icon--play'></button>
              <button className='task__icon task__icon--pause'></button>
              <span className='task__timer_time'>12:25</span>
            </div>
            <span className='task__description'>
              created{' '}
              {formatDistanceToNow(task.created, {
                addSuffix: true,
                includeSeconds: true,
              })}
            </span>
          </label>
          <button type='button' onClick={() => onEdit(task.id)} className='task__icon task__icon--edit'></button>
          <button type='button' onClick={() => onDelete(task.id)} className='task__icon task__icon--destroy'></button>
        </div>
        <form onSubmit={this.onEditFinished}>
          <input
            id='task-edit-field-id'
            type='text'
            className={task.editing ? 'task__edit-field' : 'hidden'}
            onChange={this.onDescriptionChange}
            value={this.state.editingDescription}
            required
          />
          <label htmlFor='task-edit-field-id' className='visually-hidden'>
            Field for editing the task description
          </label>
        </form>
      </li>
    );
  }
}
