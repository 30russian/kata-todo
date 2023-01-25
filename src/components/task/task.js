import { Component } from 'react';
import './task.scss';

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
      <li className={task.completed ? 'task task--completed' : 'task'}>
        <div className='task__view'>
          <input onChange={() => onComplete(task.id)}
                 className='task__toggle'
                 type='checkbox'
                 checked={Boolean(task.completed)} />
          <label>
            <span className='task__description'>{task.description}</span>
            <span className='task__created'>created {formatDistanceToNow(task.created, {
              addSuffix: true,
              includeSeconds: true
            })}</span>
          </label>
          <button className='task__icon task__icon--edit'></button>
          <button onClick={() => onDelete(task.id)} className='task__icon task__icon--destroy'></button>
        </div>
      </li>
    );
  }
};