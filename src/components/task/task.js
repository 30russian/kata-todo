import { Component } from 'react'

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {...props.task};
  }

  onChange = (event) => {
    this.setState(() => {
      return {completed: event.target.checked};
    });
  };

  render() {
    return (
      <li className={this.state.completed ? "completed" : undefined}>
        <div className="view">
          <input onChange={this.onChange} className="toggle" type="checkbox" checked={this.state.completed} />
          <label>
            <span className="description">{this.state.description}</span>
            <span className="created">created 17 seconds ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button onClick={() => this.props.onDelete(this.props.task.id)} className="icon icon-destroy"></button>
        </div>
      </li>
    );
  }
};