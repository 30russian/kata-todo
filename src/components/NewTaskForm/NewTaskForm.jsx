import './NewTaskForm.scss';

import { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    description: '',
    minutes: '',
    seconds: '',
  };

  static propTypes = {
    onNewTask: PropTypes.func.isRequired,
  };

  onDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };

  onTimerChange = (event) => {
    event.preventDefault();
    const element = event.target;
    const stateTarget = element.matches('#new-task-form-minutes-id') ? 'minutes' : 'seconds';
    if (
      (element.value.match(/\d{1,2}/g) && Number(element.value) > 0 && Number(element.value) < 60) ||
      element.value === ''
    ) {
      this.setState({ [stateTarget]: element.value });
    } else {
      this.setState((state) => ({ [stateTarget]: state[stateTarget] }));
    }
  };

  onNewTaskSubmit = (event) => {
    const { minutes, seconds } = this.state;
    const description = this.state.description.trim();
    if (description.length > 0) {
      this.props.onNewTask(description, Number(minutes), Number(seconds));
      this.setState({ description: '', minutes: '', seconds: '' });
    }

    event.preventDefault();
  };

  render() {
    return (
      <header className='new-task-form'>
        <h1>todos</h1>
        <form onSubmit={this.onNewTaskSubmit} autoComplete='off'>
          <input
            id='new-task-form-id'
            className='new-task-form__description'
            onChange={this.onDescriptionChange}
            placeholder='Task'
            value={this.state.description}
            required
            autoFocus
          />
          <label htmlFor='new-task-form-id' className='visually-hidden'>
            Field containing task description
          </label>
          <input
            id='new-task-form-minutes-id'
            className='new-task-form__timer'
            onChange={this.onTimerChange}
            placeholder='Min'
            value={this.state.minutes}
          />
          <label htmlFor='new-task-form-minutes-id' className='visually-hidden'>
            Minutes
          </label>
          <input
            id='new-task-form-seconds-id'
            className='new-task-form__timer'
            onChange={this.onTimerChange}
            placeholder='Sec'
            value={this.state.seconds}
          />
          <label htmlFor='new-task-form-seconds-id' className='visually-hidden'>
            Seconds
          </label>
          <button type='submit' hidden>
            Submit
          </button>
        </form>
      </header>
    );
  }
}
