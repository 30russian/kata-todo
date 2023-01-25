import Task from '../task'
import PropTypes from 'prop-types'

const TaskList = ({ tasks, onDelete, onComplete, filter }) => {
  if (filter !== 'all') {
    tasks = tasks.filter(item => filter === 'completed' ? item.completed : !item.completed);
  }

  const listElements = tasks.map(task => <Task key={task.id}
                                               task={task}
                                               onDelete={onDelete}
                                               onComplete={onComplete} />);

  return (
    <ul className='todo-list'>
      {listElements}
    </ul>
  )
}

TaskList.defaultProps = {
  tasks: [],
  filter: 'all'
};

TaskList.propTypes = {
  tasks: PropTypes.array,
  filter: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired
};

export default TaskList