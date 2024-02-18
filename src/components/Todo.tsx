import styles from "./todo.module.css";
import { BsCheckCircle, BsFillCheckCircleFill } from "react-icons/bs";

const Todo = ({ todo, onView, onComplete }) => {
  return (
    <div className={styles.todo}>
      <button
        className={styles.checkContainer}
        onClick={() => onComplete(todo._id, !todo.completed)}
      >
        {todo.completed ? <BsFillCheckCircleFill /> : <BsCheckCircle />}
      </button>

      <div className={styles.todoBody}>
        <p className={todo.completed ? styles.textCompleted : ""}>
          {todo.title}
        </p>
        <p className={todo.completed ? styles.textCompleted : ""}>
          {todo.desc}
        </p>
      </div>

      <button className={styles.deleteButton} onClick={() => onView(todo._id)}>
        View
      </button>
    </div>
  );
};

export default Todo;
