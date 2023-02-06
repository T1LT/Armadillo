import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../../model";
import "./TodoIndex.css";
import TodoItem from "./TodoItem";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  doneTodos: Todo[];
  setDoneTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoIndex: React.FC<Props> = ({
  todos,
  setTodos,
  doneTodos,
  setDoneTodos,
}) => {
  return (
    <div className={todos.length ? "todo-index" : "hidden"}>
      <Droppable droppableId="TodoTasks">
        {(provided, snapshot) => (
          <div
            className={`todos-not-done ${
              snapshot.isDraggingOver ? "dropping" : ""
            }`}
          >
            <h1
              className={`todo-index-header ${
                snapshot.isDraggingOver ? "header-dropping" : ""
              }`}
            >
              To Do
            </h1>
            <div
              className="todo-items-container"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {todos?.map((todo: Todo, idx: number) => (
                <TodoItem
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
                  key={idx}
                  index={idx}
                />
              ))}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="DoneTasks">
        {(provided, snapshot) => (
          <div
            className={`todos-done ${
              snapshot.isDraggingOver ? "dropping" : ""
            }`}
          >
            <h1
              className={`todo-index-header ${
                snapshot.isDraggingOver ? "header-dropping" : ""
              }`}
            >
              Done
            </h1>
            <div
              className="todo-items-container"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {doneTodos.map((todo: Todo, idx: number) => (
                <TodoItem
                  todo={todo}
                  todos={doneTodos}
                  setTodos={setDoneTodos}
                  key={idx}
                  index={idx}
                />
              ))}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoIndex;
