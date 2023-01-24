import {Component} from 'react';

export default class NewTaskForm extends Component {
  state = {
    description: ""
  };

  onDescriptionChange = (event) => {
    this.setState({description: event.target.value});
  };

  onNewTaskSubmit = (event) => {
    this.props.onNewTask(this.state.description);
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