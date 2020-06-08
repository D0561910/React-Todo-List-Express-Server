// Import dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";

// Import components
import TodoForm from "./components/todo-form";
import TodoList from "./components/todo-list";

// Import interfaces
import { TodoInterface } from "./interfaces";

// Import styles
import "./styles/styles.css";

// Define API
// Example https://{Cloud-Functions-ID}/{Route-Name}/{api}/{API-Name}
const GET_DATA = "";
const CREATE_DATA = "";
const UPDATE_DATA = "";
const DELETE_DATA = "";
const DATA_STATUS = "";

// TodoListApp component
const TodoListApp = () => {
  const [todos, setTodos] = useState<TodoInterface[]>([]);

  useEffect(() => {
    axios
      .get(GET_DATA)
      .then((res) => {
        let items = res.data.data;
        let todoItem = [];
        for (let item in items) {
          todoItem.push({
            id: items[item].id,
            task: items[item].task,
            done: items[item].done,
          });
        }
        setTodos(todoItem);
      });
  }, []);

  // Creating new todo item
  function handleTodoCreate(todo: TodoInterface) {
    // Prepare new todos state
    const newTodosState: TodoInterface[] = [...todos];
    // Update new todos state
    newTodosState.push(todo);
    // Update todos state
    setTodos(newTodosState);
    axios
      .post(CREATE_DATA, todo)
      .then((res) => {
        // console.log(res);
      });
  }

  // Update existing todo item
  function handleTodoUpdate(
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) {
    // Prepare new todos state
    const newTodosState: TodoInterface[] = [...todos];
    // Find correct todo item to update
    newTodosState.find((todo: TodoInterface) => todo.id === id)!.task =
      event.target.value;

    axios
      .post(UPDATE_DATA, { id, task: event.target.value })
      .then((res) => {
        // Update todos state
        setTodos(newTodosState);
      });
  }

  // Remove existing todo item
  function handleTodoRemove(id: string) {
    // Prepare new todos state
    const newTodosState: TodoInterface[] = todos.filter(
      (todo: TodoInterface) => todo.id !== id
    );
    axios
      .post(DELETE_DATA, { id })
      .then((res) => {
        // console.log(res);
        // Update todos state
        setTodos(newTodosState);
      });
  }

  // Check existing todo item as completed
  function handleTodoComplete(id: string) {
    // Copy current todos state
    const newTodosState: TodoInterface[] = [...todos];
    // Find the correct todo item and update its 'isCompleted' key
    newTodosState.find(
      (todo: TodoInterface) => todo.id === id
    )!.done = !newTodosState.find((todo: TodoInterface) => todo.id === id)!
      .done;

    let status = !newTodosState.find((todo: TodoInterface) => todo.id === id)!
      .done;
    // console.log({ status });

    axios
      .post(DATA_STATUS, { id, done: !status })
      .then((res) => {
        // console.log({ res });
        // Update todos state
        setTodos(newTodosState);
      });
  }

  // Check if todo item has title
  function handleTodoBlur(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length === 0) {
      event.target.classList.add("todo-input-error");
    } else {
      event.target.classList.remove("todo-input-error");
    }
  }
  return (
    <div className="todo-list-app">
      <TodoForm todos={todos} handleTodoCreate={handleTodoCreate} />
      <TodoList
        todos={todos}
        handleTodoUpdate={handleTodoUpdate}
        handleTodoRemove={handleTodoRemove}
        handleTodoComplete={handleTodoComplete}
        handleTodoBlur={handleTodoBlur}
      />
    </div>
  );
};

export default TodoListApp;
