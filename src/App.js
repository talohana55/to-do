import React from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import ToDoList from "./components/ToDoList";
import "./App.css";
//import cookie from "react-cookies";

const App = () => {
  return (
    <div className="container">
      <div className="app-wrapper">
        <div>
          <Header />
        </div>
        <div>
          <Form />
        </div>
        <div>
          <ToDoList />
        </div>
      </div>
    </div>
  );
};

export default App;
