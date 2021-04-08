import React, { createContext, useState } from "react";
export const AppContext = createContext();

const ContextProvider = (props) => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  //----function's for Tasks----//
  const addTaskToList = (task) => {
    let temp = [...tasks, task];
    console.table(temp);
    setTasks(temp);
  };
  const deleteTask = (id) => {
    let temp = [...tasks];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        temp.splice(i, 1);
        setTasks(temp);
      }
    }
  };
  const accomplishTask = (id) => {
    const elementsIndex = tasks.findIndex((task) => task.id === id);
    let temp = [...tasks];
    if (temp[elementsIndex].accomplish === true) {
      temp[elementsIndex] = {
        ...temp[elementsIndex],
        accomplish: false,
      };
    } else {
      temp[elementsIndex] = {
        ...temp[elementsIndex],
        accomplish: true,
      };
    }
    setTasks(temp);
  };

  

  return (
    <AppContext.Provider
      value={{
        tasks,
        setTasks,
        deleteTask,
        accomplishTask,
        input,
        setInput,
        addTaskToList,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
