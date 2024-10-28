import React, { useState, useEffect } from "react";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  
  const addTask = () => {
    if (newTask.trim() === "") {
      alert("Please enter a task.");
      return;
    }
    if (tasks.some(task => task.text === newTask)) {
      alert("Task already exists.");
      return;
    }
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask(""); 
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  
  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="container my-5 bg-body-tertiary w-25 p-3 shadow p-3 mb-5 bg-body-tertiary rounded">
      <h1 className="text-center mb-4">Todo List</h1>
      <div className="mb-4 d-flex justify-content-center">
        <TextField
          label="Enter a new task"
          variant="outlined"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="me-2 w-50 btn-outline-info"
        />
        <Button variant="contained" color="primary" onClick={addTask}>
          Add Task
        </Button>
      </div>
      
      <ul className="list-unstyled">
        {tasks.map((task, index) => (
          <li key={index} className="mb-3">
            <Card className={`w-75 mx-auto ${task.completed ? "bg-light" : ""}`}>
              <CardContent>
                <div className="d-flex justify-content-between align-items-center">
                  <Typography
                    variant="body1"
                    onClick={() => toggleTaskCompletion(index)}
                    style={{ 
                      textDecoration: task.completed ? "line-through" : "none",
                      cursor: "pointer"
                    }}
                  >
                    {task.text}
                  </Typography>
                  <Button
                  className="bg-primary text-white py-2"
                    variant="outlined"
                    color="white"
                    size="small"
                    onClick={() => removeTask(index)}
                  >
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;




























































































