import TasksFilter from '../tasks-filter';

const Footer = ({tasks, onFilterClicked, onClearCompleted}) => {
  return (
    <footer className="footer">
      <span className="todo-count">{tasks.filter(item => !item.completed).length} items left</span>
      <TasksFilter onFilterClicked={onFilterClicked} />
      <button onClick={onClearCompleted}
              className="clear-completed">Clear completed</button>
    </footer>
  );
};

export default Footer;