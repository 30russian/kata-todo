import ReactDOM from 'react-dom/client';

import App from './components/app';

const tasks = [
  {description: 'Completed task', completed: true},
  {description: 'Editing task'},
  {description: 'Active task'}
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App tasks={tasks} />
);
