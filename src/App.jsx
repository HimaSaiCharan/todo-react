import { Component } from "react";

class Task extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li
        style={{
          textDecoration: this.props.task.done ? "line-through" : "none",
        }}
        onClick={() => this.props.toggle(this.props.task.taskId)}
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

  addTask = (event) => {
    if (event.key === "Enter" && this.state.value.trim()) {
      this.props.addTask(this.state.value);
      this.setState({ value: "" });
    }
  };

  placeHolder() {
    return this.props.placeholder || "Add a task";
  }

  render() {
    return (
      <input
        placeholder={this.placeHolder()}
        type="text"
        onChange={this.handleChange}
        onKeyDown={this.addTask}
        value={this.state.value}
      />
    );
  }
}

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", tasks: this.props.tasks };
    this.toggle = this.toggle.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  toggle(taskId) {
    this.setState((prev) => {
      const tasks = prev.tasks.map((task) => {
        return task.taskId === taskId ? { ...task, done: !task.done } : task;
      });

      return { ...prev, tasks };
    });
  }

  addTask(description) {
    this.setState((prev) => {
      const tasks = [
        ...prev.tasks,
        { description, taskId: Date.now(), done: false },
      ];

      return { ...prev, tasks };
    });
  }

  render() {
    return (
      <div>
        <Input addTask={this.addTask} />
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
      <TaskList
        tasks={[
          { description: "buy milk", taskId: 1, done: false },
          { description: "buy water", taskId: 2, done: false },
        ]}
      />
    </>
  );
}

export default App;
