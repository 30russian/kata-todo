import { Component } from 'react'

export default class Task extends Component {
  render() {
    const { task, onComplete, onDelete } = this.props;
    return (
      <li className={task.completed ? "completed" : undefined}>
        <div className="view">
          <input onChange={() => onComplete(task.id)} className="toggle" type="checkbox" checked={Boolean(task.completed)} />
          <label>
            <span className="description">{task.description}</span>
            <span className="created">created 17 seconds ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button onClick={() => onDelete(task.id)} className="icon icon-destroy"></button>
        </div>
      </li>
    );
  }
};