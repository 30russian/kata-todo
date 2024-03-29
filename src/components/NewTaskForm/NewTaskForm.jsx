import './NewTaskForm.scss';

import { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    description: '',
  };

  static propTypes = {
    onNewTask: PropTypes.func.isRequired,
  };

  onDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };

  onNewTaskSubmit = (event) => {
    const description = this.state.description.trim();
    if (description.length > 0) {
      this.props.onNewTask(description);
      this.setState({ description: '' });
    }

    event.preventDefault();
  };

  render() {
    return (
      <header className='new-task-form'>
        <h1>todos</h1>
        <form onSubmit={this.onNewTaskSubmit}>
          <input
            id='new-task-form-id'
            className='new-task-form__description'
            onChange={this.onDescriptionChange}
            placeholder='What needs to be done?'
            value={this.state.description}
            autoFocus
          />
          <label htmlFor='new-task-form-id' className='visually-hidden'>
            Field containing task description
          </label>
        </form>
      </header>
    );
  }
}
