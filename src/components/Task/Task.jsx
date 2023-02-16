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
    hidden: PropTypes.bool,
    onComplete: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onEditFinished: PropTypes.func.isRequired,
    onTimerTicked: PropTypes.func.isRequired,
  };

  static defaultProps = {
    hidden: false,
  };

  componentWillUnmount() {
    this.stopTimer();
  }

  onDescriptionChange = (event) => {
    this.setState({ editingDescription: event.target.value });
  };

  onEditFinished = (event) => {
    this.props.onEditFinished(this.state.editingDescription);

    event.preventDefault();
  };

  startTimer = () => {
    const { onTimerTicked, task } = this.props;
    if (!this._timer) {
      this._timer = setInterval(() => {
        onTimerTicked(task.id);
      }, 1000);
    }
  };

  stopTimer = () => {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  };

  render() {
    const { task, hidden, onComplete, onDelete, onEdit } = this.props;
    let classList = ['task'];
    if (task.completed) {
      classList.push('task--completed');
    }
    if (task.editing) {
      classList.push('task--editing');
    }

    const minutes = Math.floor(task.duration / 60);
    const seconds = task.duration % 60;
    const spendTime =
      minutes > 0 || seconds > 0 ? `${minutes}:${seconds.toLocaleString('en-US', { minimumIntegerDigits: 2 })}` : '';

    return (
      <li className={classList.join(' ')} hidden={hidden}>
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
              <button className='task__icon task__icon--play' onClick={this.startTimer}></button>
              <button className='task__icon task__icon--pause' onClick={this.stopTimer}></button>
              <span className='task__timer_time'>{spendTime}</span>
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
