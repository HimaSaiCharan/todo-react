import { Component } from "react";

class Task extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <li>{this.props.task}</li>;
  }
}

class TaskList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul>
        {this.props.tasks.map((task) => {
          return <Task task={task} />;
        })}
      </ul>
    );
  }
}

function App() {
  return (
    <>
      <div>
        <TaskList tasks={["buy milk", "buy water"]} />
      </div>
    </>
  );
}

export default App;
