import { useEffect, useState } from "react";
import { AddTodo, EditTodo, GetTodoData, GetTodos } from "../rest/todo";
import Todo from "../components/Todo";
import "./todoList.css";
import AddOrEditTodo from "../components/AddOrEditTodo/AddOrEditTodo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [operation, setOperation] = useState("add");
  const [selectedId, setId] = useState("");
  const [todoData, setTodoData] = useState({
    title: "",
    desc: "",
    completed: false,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCompleted, setFilterCompleted] = useState("all");
  const [sortByCompleted, setSortByCompleted] = useState(false);
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

  const handleClickInside = (e) => {
    e.stopPropagation();
  };

  const onAdd = async (title: string, desc: string, completed: boolean) => {
    const payload = {
      title,
      desc,
      completed,
    };

    if (operation === "edit") {
      await EditTodo(payload, selectedId);
    } else {
      await AddTodo(payload);
    }
    setShowModal(false);
    const response = await GetTodos();
    setTodos(response.data.todos);
  };

  const onView = async (id: string) => {
    setOperation("edit");
    setId(id);
    const response = await GetTodoData(id);
    setTodoData({
      title: response.data.todo.title,
      desc: response.data.todo.desc,
      completed: response.data.todo.completed,
    });
    setShowModal(true);
  };

  const onComplete = async (id: string, complete: boolean) => {
    const payload = {
      completed: complete,
    };
    await EditTodo(payload, id);
    const response = await GetTodos();
    setTodos(response.data.todos);
  };

  const filteredTodos = todos
    .filter(
      (todo) =>
        (filterCompleted === "all" ||
          todo.completed === (filterCompleted === "completed")) &&
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortByCompleted) {
        return a.completed - b.completed;
      } else {
        return a.title.localeCompare(b.title);
      }
    });

  return (
    <div className="todo-list-container">
      <h1>
        TODO <span className="blue">LIST</span>
      </h1>
      <div className="wnakers">
        <div>
          <input
            type="text"
            placeholder="Search by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search"
          />
        </div>
        <div>
          <select
            value={filterCompleted}
            onChange={(e) => setFilterCompleted(e.target.value)}
            className="filter-dropdown"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
        <div>
          <label className="sort-label">
            <input
              type="checkbox"
              checked={sortByCompleted}
              className="sort-checkbox"
              onChange={(e) => setSortByCompleted(e.target.checked)}
            />
            Sort by status
          </label>
        </div>
      </div>
      <div className="todo-list">
        {filteredTodos.map((todo) => (
          <Todo
            key={todo._id}
            todo={todo}
            onView={onView}
            onComplete={onComplete}
          />
        ))}
      </div>
      <div className="button-container">
        <button
          className="add-button"
          onClick={() => {
            setShowModal(true);
            setOperation("add");
            setTodoData({
              title: "",
              desc: "",
              completed: false,
            });
          }}
        >
          Add Todo
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={handleClickInside}>
            <span className="close-icon" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <AddOrEditTodo onAdd={onAdd} mode={operation} data={todoData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
