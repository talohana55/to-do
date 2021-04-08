import React, { useContext, useState } from "react";
import "../Style/Form.css";
import { v4 as uuidV4 } from "uuid";
import { AppContext } from "../context/ContextProvider";
import moment from "moment";

const Form = () => {
  const { updateTask, editInput, addTaskToList, tasks } = useContext(
    AppContext
  );
  var d = new Date();
  var today = d.toLocaleDateString();
  today = moment(today).format("DD.MM.YYYY");

  const [taskForm, setTaskForm] = useState({
    title: "",
    id: "",
    date: today,
    accomplish: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskForm({
      ...taskForm,
      [name]: value,
    });
    console.table(tasks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editInput) {
      taskForm.id = uuidV4(); // generate id
      addTaskToList(taskForm);
      console.table(taskForm);
    }
  };

  return (
    <form className="form-container" id="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a Todo..."
        id="taskInput"
        className="taskInput"
        name="title"
        value={taskForm.title}
        onChange={handleChange}
        required
      />
      <div>
        <button className="button-add" type="submit">
          Add
        </button>
      </div>
    </form>
  );
};

export default Form;
