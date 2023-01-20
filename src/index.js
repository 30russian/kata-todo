import ReactDOM from 'react-dom/client';

import App from './components/app';

const tasks = [
  {id: 1, description: 'Completed task', completed: true},
  {id: 2, description: 'Editing task'},
  {id: 3, description: 'Active task'}
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App tasks={tasks} />
);
