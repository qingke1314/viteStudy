// SIG数据存储的思想


import { useReducer } from "react";
import TaskList from './TaskList.jsx'
import AddTask from "./AddTask.jsx";
import { TasksContext, TasksDispatchContext } from "./reducerContext.js";

// reducer 函数
function tasksReducer(tasks, action) { // 传参： state、action
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
// 初始状态
const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink appleJuice', done: false }
];

export default function TaskApp(props) {
  console.log('props.location', props.history)
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  // ...
  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        <h1>Day off in Kyoto</h1>
        <AddTask/>
        <TaskList/>
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}