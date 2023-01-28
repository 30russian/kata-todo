import PropTypes from 'prop-types';

import TasksFilter from '../tasks-filter';
import './footer.scss';

const Footer = ({ tasks, onFilterClicked, onClearCompleted }) => {
  return (
    <footer className="footer">
      <span className="footer__tasks-count">{tasks.filter((item) => !item.completed).length} items left</span>
      <TasksFilter onFilterClicked={onFilterClicked} />
      <button onClick={onClearCompleted} className="footer__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  tasks: [],
};

Footer.propTypes = {
  tasks: PropTypes.array,
  onFilterClicked: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};

export default Footer;
