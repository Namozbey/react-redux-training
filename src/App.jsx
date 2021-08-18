import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import {
  handleDelete,
  handleAdd,
  handleComplete,
  handleRestore,
  handleSet,
} from "./redux/actions/todos/todos";

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
        handleSet(dispatch)(result);
      });
  }, []);

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
        <button
          onClick={() => {
            handleAdd(dispatch)(todo);
            setTodo("");
          }}
        >
          Add
        </button>
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
                        activeTab !== 2
                          ? handleComplete(dispatch)(el)
                          : handleRestore(dispatch)(el)
                      }
                    >
                      {activeTab === 0
                        ? "Complete"
                        : activeTab === 1
                        ? null
                        : "Restore"}
                    </span>
                    {activeTab === 0 && (
                      <span onClick={() => handleDelete(dispatch)(el)}>
                        &#x274C;
                      </span>
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
