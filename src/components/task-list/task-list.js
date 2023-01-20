import Task from '../task';

const TaskList = ({tasks}) => {
  const listElements = tasks.map(task => <Task key={task.id} completed={task.completed} description={task.description}></Task>);

  return (
    <ul className="todo-list">
      {listElements}
    </ul>
  );
}

export default TaskList;