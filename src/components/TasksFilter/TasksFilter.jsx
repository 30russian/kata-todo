import './TasksFilter.scss';

import { useState } from 'react';
import PropTypes from 'prop-types';

const TasksFilter = ({ onFilterClicked }) => {
  const [filter, setFilter] = useState('all');

  const onFilterClickedHandler = (filter) => {
    setFilter(filter);
    onFilterClicked(filter);
  };

  return (
    <ul className='tasks-filter'>
      <li>
        <button
          type='button'
          onClick={() => onFilterClickedHandler('all')}
          className={filter === 'all' ? 'tasks-filter__button tasks-filter__button--selected' : 'tasks-filter__button'}>
          All
        </button>
      </li>
      <li>
        <button
          type='button'
          onClick={() => onFilterClickedHandler('active')}
          className={
            filter === 'active' ? 'tasks-filter__button tasks-filter__button--selected' : 'tasks-filter__button'
          }>
          Active
        </button>
      </li>
      <li>
        <button
          type='button'
          onClick={() => onFilterClickedHandler('completed')}
          className={
            filter === 'completed' ? 'tasks-filter__button tasks-filter__button--selected' : 'tasks-filter__button'
          }>
          Completed
        </button>
      </li>
    </ul>
  );
};

TasksFilter.propTypes = {
  onFilterClicked: PropTypes.func.isRequired,
};

export default TasksFilter;
