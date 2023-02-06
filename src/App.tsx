import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./App.css";
import Input from "./components/Input/Input";
import TodoIndex from "./components/TodoIndex/TodoIndex";
import { Todo } from "./model";

const App: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [doneTodos, setDoneTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      setTodos((prev) => [{ id: Date.now(), task, done: false }, ...prev]);
      setTask("");
    }
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    let add,
      active = todos,
      complete = doneTodos;
    if (source.droppableId === "TodoTasks") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }
    if (destination.droppableId === "TodoTasks") {
      active.splice(destination.index, 0, { ...add, done: false });
    } else {
      complete.splice(destination.index, 0, { ...add, done: true });
    }
    setTodos(active);
    setDoneTodos(complete);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="App">
        <h1 className="main-header">Armadillo</h1>
        <Input task={task} setTask={setTask} handleAdd={handleAdd} />
        <TodoIndex
          todos={todos}
          setTodos={setTodos}
          doneTodos={doneTodos}
          setDoneTodos={setDoneTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
