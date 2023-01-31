import PropTypes from 'prop-types';

import Task from '../Task';

import './TaskList.scss';

const TaskList = ({ tasks, filter, ...restProps }) => {
  if (filter !== 'all') {
    tasks = tasks.filter((item) => (filter === 'completed' ? item.completed : !item.completed));
  }

  const listElements = tasks.map((task) => <Task key={task.id} task={task} {...restProps} />);

  return <ul className='task-list'>{listElements}</ul>;
};

TaskList.defaultProps = {
  tasks: [],
  filter: 'all',
};

TaskList.propTypes = {
  tasks: PropTypes.array,
  filter: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onEditFinished: PropTypes.func.isRequired,
};

export default TaskList;
