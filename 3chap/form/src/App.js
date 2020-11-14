import React, { Component } from "react";
import { SimpleForm } from "./SimpleForm";
import NumberForm from "./NumberForm";
import MultiForm from "./MultiForm";
import "./App.css";

function App() {
  const st = { textAlign: "left", padding: "10px" };
  return (
    <div className="App" style={st}>
      <SimpleForm />
      <NumberForm />
      <MultiForm />
    </div>
  );
}

export default App;
