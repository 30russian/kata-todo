import Task from '../task';

const TaskList = ({tasks, onDelete, onComplete}) => {
  const listElements = tasks.map(task => <Task key={task.id}
                                               task={task}
                                               onDelete={onDelete}
                                               onComplete={onComplete} />);

  return (
    <ul className="todo-list">
      {listElements}
    </ul>
  );
};

export default TaskList;