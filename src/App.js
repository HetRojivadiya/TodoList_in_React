import "./App.css";
import React, { useState } from "react";

const TodoList = () => {
  const [list, setList] = useState([]);
  const [valueTodo, setValue] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [editText, setEditText] = useState("");

  const changeValue = (event) => {
    setValue(event.target.value);
  };

  const addList = () => {
    if (valueTodo.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text: valueTodo,
      };
      setList([...list, newTodo]);
      setValue("");
    }
  };

  const editTodo = (id, text) => {
    setEditMode(id);
    setEditText(text);
  };

  const changeEdit = (e) => {
    setEditText(e.target.value);
  };

  const saveTodo = (id) => {
    if (editText.trim() !== "") {
      setList(
        list.map((todo) => (todo.id === id ? { ...todo, text:editText } : todo))
      );
      setEditMode(null);
      setEditText("");
    }
  };

  const deleteTodo = (id) => {
    const newList = list.filter((todo) => todo.id !== id);
    setList(newList);
  };

  return (
    <>
      <div className="container my-3">
        <h1>Todo List</h1>
        <div className="center">
          <input
            type="text"
            id="value"
            onChange={changeValue}
            value={valueTodo}
            placeholder="Add a new task..."
          />
          <button id="add-task" onClick={addList} className="text-center">
            Add
          </button>
        </div>
        <ul>
          {list.map((todo) => (
            <li key={todo.id}>
              
              {editMode === todo.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={changeEdit}
                />
              ) : (
                todo.text
              )}
              {editMode === todo.id ? (
                <>
                  <button className="save" onClick={() => saveTodo(todo.id)}>Save</button>
                  <button className="cancel" onClick={() => setEditMode(null)}>Cancel</button>
                </>
              ) : (
                <>
                  
                  <button className="edit" onClick={() => editTodo(todo.id, todo.text)}>Edit</button>
                  <button className="delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
          <li>Total Task : {list.length}</li>
        </ul>
      </div>
    </>
  );
};

export default TodoList;
