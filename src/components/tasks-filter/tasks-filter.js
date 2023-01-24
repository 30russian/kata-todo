import {Component} from 'react';

export default class TasksFilter extends Component {
  state = {
    filter: 'all'
  };

  onFilterClicked = (filter) => {
    this.setState({filter});
    this.props.onFilterClicked(filter);
  };

  render() {
    return (
      <ul className="filters">
        <li>
          <button onClick={() => this.onFilterClicked('all')}
                  className={this.state.filter === 'all' ? 'selected' : undefined}>All</button>
        </li>
        <li>
          <button onClick={() => this.onFilterClicked('active')}
                  className={this.state.filter === 'active' ? 'selected' : undefined}>Active</button>
        </li>
        <li>
          <button onClick={() => this.onFilterClicked('completed')}
                  className={this.state.filter === 'completed' ? 'selected' : undefined}>Completed</button>
        </li>
      </ul>
    );
  }
};