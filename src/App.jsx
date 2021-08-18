import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  ADD_TODO,
  CHANGE_STATUS,
  REMOVE_TODO,
  SET_TODOS,
} from "./redux/actions/todos/todosTypes";

const tabs = [
  {
    id: 0,
    text: "New",
    value: "new",
  },
  {
    id: 1,
    text: "Completed",
    value: "completed",
  },
  {
    id: 2,
    text: "Deleted",
    value: "deleted",
  },
];

function App() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [todo, setTodo] = useState("");

  const todos = useSelector((store) => store.todos);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1/todos")
      .then((res) => res.json())
      .then((result) => {
        dispatch({
          type: SET_TODOS,
          payload: result.map(({ userId, id, title, completed }) => ({
            userId,
            id,
            title,
            status: "new",
          })),
        });
      });
  }, []);

  const handleDelete = (el) => {
    dispatch({
      type: CHANGE_STATUS,
      payload: { id: el.id, status: "deleted" },
    });
  };

  const handleAdd = () => {
    dispatch({
      type: ADD_TODO,
      payload: { title: todo },
    });
    setTodo("");
  };

  const handleComplete = (el) => {
    dispatch({
      type: CHANGE_STATUS,
      payload: { id: el.id, status: "completed" },
    });
  };

  const handleRestore = (el) => {
    dispatch({
      type: CHANGE_STATUS,
      payload: { id: el.id, status: "new" },
    });
  };

  return (
    <div className="App">
      {/* Input Area */}
      <div className="input">
        <input
          placeholder="Enter title"
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={() => handleAdd()}>Add</button>
      </div>
      {/* Tabs */}
      <div className="tabs">
        <ul>
          {tabs.map(({ text, id }) => (
            <li
              key={id}
              className={activeTab === id && "activeTab"}
              onClick={() => setActiveTab(id)}
            >
              {text}
            </li>
          ))}
        </ul>
      </div>
      {/* Content */}
      <div className="content">
        <div className="card">
          {todos.map(
            (el, index) =>
              el.status === tabs[activeTab].value && (
                <div className="item">
                  <span className="title">{el.title}</span>

                  <span>
                    <span className="status">{el.status}</span>
                    <span
                      style={{ marginRight: "6px" }}
                      onClick={() =>
                        activeTab !== 2 ? handleComplete(el) : handleRestore(el)
                      }
                    >
                      {activeTab === 0
                        ? "Complete"
                        : activeTab === 1
                        ? null
                        : "Restore"}
                    </span>
                    {activeTab === 0 && (
                      <span onClick={() => handleDelete(el)}>&#x274C;</span>
                    )}
                  </span>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
