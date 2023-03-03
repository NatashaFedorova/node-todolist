const express = require("express");
const cors = require("cors");
require("dotenv").config();
console.log(process.env.PORT);
const routerApi = require("./api");

const app = express();

// parse application/json
app.use(express.json());

//cors
app.use(cors());

app.use("/api", routerApi);

// error 404
app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/tasks",
    data: "not  found",
  });
});

//error 500 - внутрішня помилка сервера
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal server error",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Port ${PORT} is used`);
});
