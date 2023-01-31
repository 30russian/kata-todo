import './TasksFilter.scss';

import { Component } from 'react';
import PropTypes from 'prop-types';

export default class TasksFilter extends Component {
  state = {
    filter: 'all',
  };

  static propTypes = {
    onFilterClicked: PropTypes.func.isRequired,
  };

  onFilterClicked = (filter) => {
    this.setState({ filter });
    this.props.onFilterClicked(filter);
  };

  render() {
    return (
      <ul className="tasks-filter">
        <li>
          <button
            onClick={() => this.onFilterClicked('all')}
            className={
              this.state.filter === 'all'
                ? 'tasks-filter__button tasks-filter__button--selected'
                : 'tasks-filter__button'
            }
          >
            All
          </button>
        </li>
        <li>
          <button
            onClick={() => this.onFilterClicked('active')}
            className={
              this.state.filter === 'active'
                ? 'tasks-filter__button tasks-filter__button--selected'
                : 'tasks-filter__button'
            }
          >
            Active
          </button>
        </li>
        <li>
          <button
            onClick={() => this.onFilterClicked('completed')}
            className={
              this.state.filter === 'completed'
                ? 'tasks-filter__button tasks-filter__button--selected'
                : 'tasks-filter__button'
            }
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
