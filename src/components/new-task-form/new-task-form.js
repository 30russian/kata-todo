import {Component} from 'react';
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
  state = {
    description: ""
  };

  static propTypes = {
    onNewTask: PropTypes.func.isRequired
  };

  onDescriptionChange = (event) => {
    this.setState({description: event.target.value});
  };

  onNewTaskSubmit = (event) => {
    this.props.onNewTask(this.state.description);
    this.setState({description: ''});

    event.preventDefault();
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onNewTaskSubmit}>
          <input className="new-todo" onChange={this.onDescriptionChange}
                 placeholder="What needs to be done?"
                 value={this.state.description}
                 autoFocus />
        </form>
      </header>
    );
  }
};