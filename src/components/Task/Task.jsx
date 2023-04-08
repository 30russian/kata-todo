import { useState, useMemo, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import './Task.scss';

const Task = ({ task, hidden, onComplete, onDelete, onEdit, onEditFinished, onTimerTicked }) => {
  const [editingDescription, setEditingDescription] = useState(task.description);
  const [timerRun, setTimerRun] = useState(false);

  const classList = useMemo(() => {
    const result = ['task'];
    if (task.completed) {
      result.push('task--completed');
    }
    if (task.editing) {
      result.push('task--editing');
    }
    return result;
  }, [task.completed, task.editing]);

  const spendTime = useMemo(() => {
    const minutes = Math.floor(task.duration / 60);
    const seconds = task.duration % 60;
    return minutes > 0 || seconds > 0
      ? `${minutes}:${seconds.toLocaleString('en-US', { minimumIntegerDigits: 2 })}`
      : '';
  }, [task.duration]);

  const editFinishedHandler = (event) => {
    onEditFinished(editingDescription);

    event.preventDefault();
  };

  useEffect(() => {
    if (timerRun) {
      const timer = setInterval(() => {
        onTimerTicked(task.id);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [timerRun]);

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
            <button className='task__icon task__icon--play' onClick={() => setTimerRun(true)}></button>
            <button className='task__icon task__icon--pause' onClick={() => setTimerRun(false)}></button>
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
      <form onSubmit={editFinishedHandler}>
        <input
          id='task-edit-field-id'
          type='text'
          className={task.editing ? 'task__edit-field' : 'hidden'}
          onChange={(event) => setEditingDescription(event.target.value)}
          value={editingDescription}
          required
        />
        <label htmlFor='task-edit-field-id' className='visually-hidden'>
          Field for editing the task description
        </label>
      </form>
    </li>
  );
};

Task.propTypes = {
  task: PropTypes.object.isRequired,
  hidden: PropTypes.bool,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onEditFinished: PropTypes.func.isRequired,
  onTimerTicked: PropTypes.func.isRequired,
};

Task.defaultProps = {
  hidden: false,
};

export default Task;
