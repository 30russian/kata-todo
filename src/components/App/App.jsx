import { parseISO } from 'date-fns';
import { Component } from 'react';

import TaskList from '../TaskList';
import Footer from '../Footer';
import NewTaskForm from '../NewTaskForm';

import './App.scss';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.lastId = 100;
  }

  fillTasksFromLS() {
    const tasks = JSON.parse(window.localStorage.getItem('tasks') ?? '[]');
    tasks.forEach((task) => {
      task.created = parseISO(task.created);
    });
    this.setState({ tasks });

    this.lastId = Math.max.apply(
      null,
      tasks.map((task) => task.id)
    );
  }

  componentDidMount() {
    this.fillTasksFromLS();

    window.addEventListener('storage', () => {
      this.fillTasksFromLS();
    });
  }

  state = {
    tasks: [],
    filter: 'all',
  };

  x = 0;

  onComplete = (id) => {
    this.setState((state) => {
      const { tasks } = state;
      const idx = tasks.findIndex((el) => el.id === id);
      const newTask = { ...tasks[idx], completed: !tasks[idx].completed };
      const newTasks = [...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)];

      return { tasks: newTasks };
    });
  };

  onEdit = (id) => {
    this.setState((state) => {
      const { tasks } = state;
      const newTasks = [...tasks];

      const editingIdx = newTasks.findIndex((el) => el.editing);
      if (editingIdx >= 0) {
        const editingTask = { ...newTasks[editingIdx], editing: false };
        newTasks.splice(editingIdx, 1, editingTask);
      }

      const idx = newTasks.findIndex((el) => el.id === id);
      const newTask = { ...newTasks[idx], editing: true };
      newTasks.splice(idx, 1, newTask);

      return { tasks: newTasks };
    });
  };

  onEditFinished = (description) => {
    this.setState((state) => {
      const { tasks } = state;
      const idx = tasks.findIndex((el) => el.editing);
      const newTask = { ...tasks[idx], description, editing: false };
      const newTasks = [...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)];

      window.localStorage.setItem('tasks', JSON.stringify(newTasks));

      return { tasks: newTasks };
    });
  };

  onDelete = (id) => {
    this.setState((state) => {
      const newTasks = [...state.tasks];
      const idx = newTasks.findIndex((el) => el.id === id);
      newTasks.splice(idx, 1);
      return { tasks: newTasks };
    });
  };

  onNewTask = (description, minutes, seconds) => {
    this.setState((state) => {
      const newTasks = [...state.tasks];
      newTasks.push({
        id: ++this.lastId,
        description,
        completed: false,
        created: new Date(),
        duration: minutes * 60 + seconds,
      });

      window.localStorage.setItem('tasks', JSON.stringify(newTasks));

      return { tasks: newTasks };
    });
  };

  onFilterClicked = (filter) => {
    this.setState({ filter });
  };

  onClearCompleted = () => {
    this.setState((state) => ({ tasks: [...state.tasks].filter((item) => !item.completed) }));
  };

  render() {
    return (
      <section className='app'>
        <NewTaskForm onNewTask={this.onNewTask} />
        <section className='app__main-section'>
          <TaskList
            tasks={this.state.tasks}
            filter={this.state.filter}
            onDelete={this.onDelete}
            onComplete={this.onComplete}
            onEdit={this.onEdit}
            onEditFinished={this.onEditFinished}
          />
          <Footer
            tasks={this.state.tasks}
            onFilterClicked={this.onFilterClicked}
            onClearCompleted={this.onClearCompleted}
          />
        </section>
      </section>
    );
  }
}
