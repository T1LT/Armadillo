import React, { useState } from "react";
import { Todo } from "../../model";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./TodoIndex.css";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
}

const TodoItem: React.FC<Props> = ({ todo, todos, setTodos, index }) => {
  const iconsx = { cursor: "pointer", opacity: 1, transition: "0.3s" };
  const iconsxHidden = { opacity: 0, transition: "0.3s" };
  const [edit, setEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.task);
  const [hover, setHover] = useState<boolean>(false);

  const handleDelete = (todoId: number) => {
    setTodos(todos.filter((todo: Todo) => todo.id !== todoId));
  };

  const handleEdit = (e: React.FormEvent, todoId: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo: Todo) =>
        todo.id === todoId ? { ...todo, task: editText } : todo
      )
    );
    setEdit(false);
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todo-item ${snapshot.isDragging ? "dragging" : ""}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {edit ? (
            <input
              type="text"
              autoFocus
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="edit-todo-input"
            />
          ) : (
            <>
              {todo.done ? (
                <s className="todo-task-text">{todo.task}</s>
              ) : (
                <span className="todo-task-text">{todo.task}</span>
              )}
            </>
          )}
          <div className="todo-actions">
            {!todo.done && (
              <EditIcon
                sx={hover ? iconsx : iconsxHidden}
                onClick={() => setEdit((prev) => !prev)}
              />
            )}
            <DeleteIcon
              sx={hover ? iconsx : iconsxHidden}
              onClick={() => handleDelete(todo.id)}
            />
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default TodoItem;
