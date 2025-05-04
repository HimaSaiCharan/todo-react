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
    console.log(props);
    this.state = {
      value: "",
      tasks: this.props.taskList.tasks,
      title: this.props.taskList.taskTitle,
    };
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
        { description, taskId: prev.tasks.length + 1, done: false },
      ];

      return { ...prev, tasks };
    });
  }

  render() {
    return (
      <div>
        <h3>{this.state.title}</h3>
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

class TaskListContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.todo.taskLists.map((taskList) => {
          return <TaskList key={taskList.taskListId} taskList={taskList} />;
        })}
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   taskLists: [
    //     {
    //       tasks: [
    //         { description: "Task 1", taskId: 1, done: false },
    //         { description: "Task 2", taskId: 2, done: false },
    //       ],
    //       taskListId: 1,
    //       taskTitle: "Default Task List",
    //     },
    //   ],
    // };
    this.state = { taskLists: [] };
    this.addTaskList = this.addTaskList.bind(this);
  }

  addTaskList(title) {
    this.setState((prev) => {
      const taskLists = [
        ...prev.taskLists,
        {
          tasks: [],
          taskListId: this.state.taskLists.length + 1,
          taskTitle: title,
        },
      ];

      return { ...prev, taskLists };
    });
  }

  render() {
    return (
      <>
        <h1>Todo List</h1>
        <Input addTask={this.addTaskList} placeholder="Add a task list" />
        <TaskListContainer todo={this.state} />
      </>
    );
  }
}

export default App;
