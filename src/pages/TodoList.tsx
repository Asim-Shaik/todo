import React, { useEffect, useState } from "react";
import { DeleteTodo, EditTodo, GetTodoData, GetTodos } from "../rest/todo";
import Todo from "../components/Todo";
import "./todoList.css"; // Import the CSS file

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getList = async () => {
      try {
        const response = await GetTodos();
        setTodos(response.data.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    getList();
  }, []);

  const onDelete = async (id: string) => {
    await DeleteTodo(id);
    const response = await GetTodos();
    setTodos(response.data.todos);
  };

  const onView = async (id: string) => {
    const response = await GetTodoData(id);
    console.log(response.data.todo);
  };

  const onComplete = async (id: string, complete: boolean) => {
    const payload = {
      completed: complete,
    };
    await EditTodo(payload, id);
    const response = await GetTodos();
    setTodos(response.data.todos);
  };

  return (
    <div className="todo-list-container">
      <h1>TODO LIST</h1>
      <div className="todo-list">
        {todos.map((todo) => (
          <Todo
            key={todo._id}
            todo={todo}
            onView={onView}
            onComplete={onComplete}
          />
        ))}
      </div>
      <div className="button-container">
        <button className="add-button" onClick={() => {}}>
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TodoList;
