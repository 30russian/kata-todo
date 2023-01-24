import Task from '../task'

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

export default TaskList