import { Component } from "react";

class Task extends Component {
  constructor(props) {
    super(props);
    this.toggle = () => this.props.toggle(this.props.task.taskId);
  }

  render() {
    return (
      <li
        style={{
          textDecoration: this.props.task.done ? "line-through" : "none",
        }}
        onClick={this.toggle}
      >
        {this.props.task.description}
      </li>
    );
  }
}

class Input extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: "" };
  }

  handleChange(event) {
    this.setState((prev) => {
      return { value: event.target.value };
    });
  }

  render() {
    return <input type="text" onChange={this.handleChange} />;
  }
}

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", tasks: this.props.tasks };
    this.toggle = this.toggle.bind(this);
  }

  toggle(taskId) {
    this.setState((prev) => {
      const tasks = prev.tasks.map((task) => {
        return task.taskId === taskId ? { ...task, done: !task.done } : task;
      });

      return { ...prev, tasks };
    });
  }

  render() {
    return (
      <div>
        <Input />
        <ul>
          {this.state.tasks.map((task) => {
            return <Task key={task.taskId} task={task} toggle={this.toggle} />;
          })}
        </ul>
      </div>
    );
  }
}

function App() {
  return (
    <>
      <div>
        <TaskList
          tasks={[
            { description: "buy milk", taskId: 1, done: false },
            { description: "buy water", taskId: 2, done: false },
          ]}
        />
      </div>
    </>
  );
}

export default App;
