import './NewTaskForm.scss';

import { useState } from 'react';
import PropTypes from 'prop-types';

const timePartChanger = (changer) => {
  return (event) => {
    event.preventDefault();
    const value = event.target.value;
    if ((value.match(/\d{1,2}/g) && Number(value) > 0 && Number(value) < 60) || value === '') {
      changer(value);
    } else {
      changer((curValue) => curValue);
    }
  };
};

const NewTaskForm = ({ onNewTask }) => {
  const [description, setDescription] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const minutesChanger = timePartChanger(setMinutes);
  const secondsChanger = timePartChanger(setSeconds);

  const onNewTaskSubmit = (event) => {
    const trimmedDescription = description.trim();
    if (trimmedDescription.length > 0) {
      onNewTask(trimmedDescription, Number(minutes), Number(seconds));
      setDescription('');
      setMinutes('');
      setSeconds('');
    }

    event.preventDefault();
  };

  return (
    <header className='new-task-form'>
      <h1>todos</h1>
      <form onSubmit={onNewTaskSubmit} autoComplete='off'>
        <input
          id='new-task-form-id'
          className='new-task-form__description'
          onChange={onDescriptionChange}
          placeholder='Task'
          value={description}
          required
          autoFocus
        />
        <label htmlFor='new-task-form-id' className='visually-hidden'>
          Field containing task description
        </label>
        <input
          name='minutes'
          id='new-task-form-minutes-id'
          className='new-task-form__timer'
          onChange={minutesChanger}
          placeholder='Min'
          value={minutes}
        />
        <label htmlFor='new-task-form-minutes-id' className='visually-hidden'>
          Minutes
        </label>
        <input
          name='seconds'
          id='new-task-form-seconds-id'
          className='new-task-form__timer'
          onChange={secondsChanger}
          placeholder='Sec'
          value={seconds}
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
};

NewTaskForm.propTypes = {
  onNewTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
