import Task from '../task';

const TaskList = ({tasks, onDelete}) => {
  const listElements = tasks.map(task => <Task key={task.id} task={task} onDelete={onDelete}></Task>);

  return (
    <ul className="todo-list">
      {listElements}
    </ul>
  );
};

export default TaskList;