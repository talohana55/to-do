import React, { useContext, useEffect, useState } from "react";
import "../Style/ToDolist.css";
import { AppContext } from "../context/ContextProvider";
import moment from "moment";

const ToDoList = () => {
  const {
    deleteTask,
    accomplishTask,
    tasks,
    setTasks,
    setNewDate,
  } = useContext(AppContext);
  const [editButton, setEditButton] = useState(false);
  const [taskIndex, setTaskIndex] = useState(null);
  const [editInput, setEditInput] = useState("");
  const [editDate, setEditDate] = useState("");

  const editATask = (id, newTitle, newDate) => {
    //debugger;
    let temp = [...tasks];
    newDate = moment(newDate).format("DD.MM.YYYY");
    console.log(newDate);
    temp[id].title = newTitle;
    temp[id].date = newDate;
    setTasks(temp);
    setEditInput("");
    setEditDate("");
    setTaskIndex(null);
    console.table(tasks);
    localStorage.setItem("my-tasks-list", JSON.stringify(tasks));
  };

  useEffect(() => {
    const data = localStorage.getItem("my-tasks-list");
    if (data) {
      console.log(JSON.parse(data));
      setTasks(JSON.parse(data));
    }
  }, [editButton]);
  useEffect(() => {
    localStorage.setItem("my-tasks-list", JSON.stringify(tasks));
  });

  return (
    <>
      {tasks.map((task, i) => {
        if (editButton) {
          if (taskIndex === i) {
            return (
              <>
                <div className="single-item" key={i}>
                  <div>
                    <button
                      onClick={() => {
                        setEditButton(false);
                        editATask(taskIndex, editInput, editDate);
                      }}
                    >
                      save
                    </button>
                    <input
                      type="text"
                      value={editInput}
                      className={`list ${
                        task.accomplish ? "complete" : "not-complete"
                      }`}
                      onChange={(e) => {
                        setEditInput(e.target.value);
                      }}
                    />
                  </div>
                  <div className="buttons">
                    <button
                      className="btn-accomplish-task"
                      onClick={() => accomplishTask(task.id)}
                    >
                      <i className="fa fa-check-circle fa-2x"></i>
                    </button>
                    <button
                      className="btn-edit-task"
                      onClick={() => {
                        setTaskIndex(i);
                        setEditButton(true);
                      }}
                    >
                      <i className="fa fa-edit fa-2x"></i>
                    </button>
                    <button
                      className="btn-delete-task"
                      onClick={() => deleteTask(task.id)}
                    >
                      <i className="fa fa-trash fa-2x"></i>
                    </button>

                    <input
                      type="date"
                      className="edit-date"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                    />
                  </div>
                </div>
              </>
            );
          } else {
            return (
              <>
                <div className="single-item" key={i}>
                  <div className="span-div">
                    <span
                      className={`list ${
                        task.accomplish ? "complete" : "not-complete"
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>
                  <div className="buttons">
                    <button
                      className="btn-accomplish-task"
                      onClick={() => accomplishTask(task.id)}
                    >
                      <i className="fa fa-check-circle fa-2x"></i>
                    </button>
                    <button
                      className="btn-edit-task"
                      onClick={() => {
                        setTaskIndex(i);
                        setEditButton(true);
                        setEditInput(task.title);
                      }}
                    >
                      <i className="fa fa-edit fa-2x"></i>
                    </button>
                    <button
                      className="btn-delete-task"
                      onClick={() => deleteTask(task.id)}
                    >
                      <i className="fa fa-trash fa-2x"></i>
                    </button>

                    <input
                      type="text"
                      className="date"
                      value={task.date}
                      name="date"
                      //onChange={(e) => setEditDate(task.id, e.target.value)}
                    />
                  </div>
                </div>
              </>
            );
          }
        } else {
          return (
            <>
              <div className="single-item" key={i}>
                <div className="span-div">
                  <span
                    className={`list ${
                      task.accomplish ? "complete" : "not-complete"
                    }`}
                  >
                    {i + 1}. {task.title}
                  </span>
                </div>
                <div className="buttons">
                  <button
                    className="btn-accomplish-task"
                    onClick={() => accomplishTask(task.id)}
                  >
                    <i className="fa fa-check-circle fa-2x"></i>
                  </button>
                  <button
                    className="btn-edit-task"
                    onClick={() => {
                      setTaskIndex(i);
                      setEditButton(true);
                    }}
                  >
                    <i className="fa fa-edit fa-2x"></i>
                  </button>
                  <button
                    className="btn-delete-task"
                    onClick={() => deleteTask(task.id)}
                  >
                    <i className="fa fa-trash fa-2x"></i>
                  </button>

                  <input
                    type="text"
                    className="date"
                    value={task.date}
                    name="date"
                    //onChange={(e) => setEditDate(task.id, e.target.value)}
                  />
                </div>
              </div>
            </>
          );
        }
      })}
    </>
  );
};

export default ToDoList;
