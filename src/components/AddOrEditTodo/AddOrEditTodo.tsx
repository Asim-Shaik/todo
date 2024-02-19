import { useEffect, useState } from "react";
import "./addOrEdit.css";
import { BsFillCheckCircleFill, BsCheckCircle } from "react-icons/bs";
import { Todo } from "../../rest/todo";

interface Props {
  onAdd: (title: string, desc: string, completed: boolean) => void;
  mode: "add" | "edit";
  data?: Todo;
}

const AddOrEditTodo: React.FC<Props> = ({ onAdd, mode, data }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDesc(data.desc);
      setCompleted(data.completed);
    }
  }, [data]);

  const handleClickInside = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  };
  const handleCompletedChange = () => {
    setCompleted(!completed);
  };
  const handleSubmit = () => {
    onAdd(title, desc, completed);
  };

  console.log(title, desc, completed);
  return (
    <div className="add-container" onClick={handleClickInside}>
      <form>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
        />

        <label htmlFor="desc">Description:</label>
        <textarea id="desc" value={desc} onChange={handleDescChange} />

        <div className="completed-checkbox">
          <button
            type="button"
            className="checkContainer"
            onClick={handleCompletedChange}
          >
            {completed ? <BsFillCheckCircleFill /> : <BsCheckCircle />}
          </button>
        </div>

        <button type="button" onClick={handleSubmit}>
          {mode} Todo
        </button>
        {mode === "edit" ? (
          <button type="button" className="delete" onClick={handleSubmit}>
            Delete Todo
          </button>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
};

export default AddOrEditTodo;
