const express = require("express");
const router = express.Router();
// const { nanoid } = require("nanoid"); // рекомендували в матерілах - ПОМИЛКА
const { v4: uuid } = require("uuid");

//Усі дані про завдання ми зберігаємо у масиві tasks,
// де жорстко прописуємо одне завдання
let tasks = [
  {
    id: uuid(),
    title: "Work!",
    text: "About my work",
    done: false,
  },
];

// читання - отримуємо список всіх завдань
router.get("/tasks", (req, res, next) => {
  res.json({
    status: "success",
    code: 200,
    data: {
      tasks,
    },
  });
});

router.get("/tasks/:id", (req, res, next) => {
  const { id } = req.params;
  const [task] = tasks.filter((el) => el.id === id);
  res.json({
    status: "success",
    code: 200,
    data: { task },
  });
});

// додаємо нову задачу
router.post("/tasks", (req, res, next) => {
  const { title, text } = req.body;
  const task = {
    id: uuid(),
    title,
    text,
    done: false,
  };
  tasks.push(task);
  res.status(201).json({
    status: "success",
    code: 201,
    data: { task },
  });
});

// оновлення
router.put("/tasks/:id", (req, res, next) => {
  const { id } = req.params;
  const { title, text } = req.body;
  const [task] = tasks.filter((el) => el.id === id);
  task.title = title;
  task.text = text;
  res.json({
    status: "success",
    code: 200,
    data: { task },
  });
});

// часткове оновлення
router.patch("/tasks/:id", (req, res, next) => {
  const { id } = req.params;
  const { done } = req.body;
  const [task] = tasks.filter((el) => el.id === id);
  task.done = done;
  res.json({
    status: "success",
    code: 200,
    data: { task },
  });
});

// видалення
router.delete("/tasks/:id", (req, res, next) => {
  const { id } = req.params;
  const newTasks = tasks.filter((el) => el.id !== id);
  tasks = [...newTasks];
  res.status(204).json();
});

module.exports = router;
