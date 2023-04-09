import { parseISO } from 'date-fns';
import { useEffect, useState } from 'react';

import TaskList from '../TaskList';
import Footer from '../Footer';
import NewTaskForm from '../NewTaskForm';

import './App.scss';

const App = () => {
  let lastId = 100;

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const fillTasksFromLS = () => {
    const tasks = JSON.parse(window.localStorage.getItem('tasks') ?? '[]');
    tasks.forEach((task) => {
      task.created = parseISO(task.created);
    });
    setTasks(tasks);

    if (tasks.length > 0) {
      lastId = Math.max.apply(
        null,
        tasks.map((task) => task.id)
      );
    }
  };

  useEffect(() => {
    fillTasksFromLS();

    window.addEventListener('storage', () => {
      fillTasksFromLS();
    });
  }, []);

  const onComplete = (id) => {
    setTasks((tasks) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const newTask = { ...tasks[idx], completed: !tasks[idx].completed };
      return [...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)];
    });
  };

  const onEdit = (id) => {
    setTasks((tasks) => {
      const newTasks = [...tasks];

      const editingIdx = newTasks.findIndex((el) => el.editing);
      if (editingIdx >= 0) {
        const editingTask = { ...newTasks[editingIdx], editing: false };
        newTasks.splice(editingIdx, 1, editingTask);
      }

      const idx = newTasks.findIndex((el) => el.id === id);
      const newTask = { ...newTasks[idx], editing: true };
      newTasks.splice(idx, 1, newTask);

      return newTasks;
    });
  };

  const onEditFinished = (description) => {
    setTasks((tasks) => {
      const idx = tasks.findIndex((el) => el.editing);
      const newTask = { ...tasks[idx], description, editing: false };
      const newTasks = [...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)];

      window.localStorage.setItem('tasks', JSON.stringify(newTasks));

      return newTasks;
    });
  };

  const onTimerTicked = (id) => {
    setTasks((tasks) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const newTask = { ...tasks[idx] };
      newTask.duration++;
      const newTasks = [...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)];

      window.localStorage.setItem('tasks', JSON.stringify(newTasks));

      return newTasks;
    });
  };

  const onDelete = (id) => {
    setTasks((tasks) => {
      const newTasks = [...tasks];
      const idx = newTasks.findIndex((el) => el.id === id);
      newTasks.splice(idx, 1);

      window.localStorage.setItem('tasks', JSON.stringify(newTasks));

      return newTasks;
    });
  };

  const onNewTask = (description, minutes, seconds) => {
    setTasks((tasks) => {
      const newTasks = [...tasks];
      newTasks.push({
        id: ++lastId,
        description,
        completed: false,
        created: new Date(),
        duration: minutes * 60 + seconds,
      });

      window.localStorage.setItem('tasks', JSON.stringify(newTasks));

      return newTasks;
    });
  };

  const onFilterClicked = (filter) => {
    setFilter(filter);
  };

  const onClearCompleted = () => {
    setTasks((tasks) => [...tasks].filter((item) => !item.completed));
  };

  return (
    <section className='app'>
      <NewTaskForm onNewTask={onNewTask} />
      <section className='app__main-section'>
        <TaskList
          tasks={tasks}
          filter={filter}
          onDelete={onDelete}
          onComplete={onComplete}
          onEdit={onEdit}
          onEditFinished={onEditFinished}
          onTimerTicked={onTimerTicked}
        />
        <Footer tasks={tasks} onFilterClicked={onFilterClicked} onClearCompleted={onClearCompleted} />
      </section>
    </section>
  );
};

export default App;
