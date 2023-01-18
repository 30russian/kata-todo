import Task from '../task';

const TaskList = (props) => {
  const listElements = props.tasks.map(task => <Task completed={task.completed} description={task.description}></Task>);

  return (
    <ul className="todo-list">
      {listElements}
    </ul>
  );
}

export default TaskList;