import TaskList from '../task-list';
import Footer from '../footer';
import NewTaskForm from '../new-task-form';
import { Component } from 'react'

export default class App extends Component {
  state = {
    tasks: [
      {id: 1, description: 'Completed task', completed: true},
      {id: 2, description: 'Editing task'},
      {id: 3, description: 'Active task'}
    ]
  };

  onComplete = (id) => {
    this.setState((state) => {
      const { tasks } = state;
      const idx = tasks.findIndex(el => el.id === id);
      const newTask = {...tasks[idx], completed: !tasks[idx].completed};
      const newTasks = [
        ...tasks.slice(0, idx),
        newTask,
        ...tasks.slice(idx + 1)
      ];

      return {tasks: newTasks};
    });
  };

  onDelete = (id) => {
    this.setState((state) => {
      const newTasks = [...state.tasks];
      const idx = newTasks.findIndex(el => el.id === id);
      newTasks.splice(idx, 1);
      return {tasks: newTasks};
    });
  };

  render() {
    return (
      <section className="todoapp">
        <NewTaskForm />
        <section className="main">
          <TaskList tasks={this.state.tasks} onDelete={this.onDelete} onComplete={this.onComplete}/>
          <Footer />
        </section>
      </section>
    );
  }
};