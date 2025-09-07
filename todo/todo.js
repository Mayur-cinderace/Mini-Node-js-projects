const { log } = require("console");
const fs = require("fs");
const filePath = "./tasks.json";

const loadTasks = () => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

const saveTasks = (tasks) => {
  fs.writeFileSync(filePath, JSON.stringify(tasks));
};

const addTask = (task) => {
  const tasks = loadTasks();
  tasks.push({ task });
  saveTasks(tasks);
};

const listTasks = () => {
  const tasks = loadTasks();

  tasks.forEach((task, index) => console.log(`${index + 1} : ${task.task}`));
};

const remove = (index) => {
  const tasks = loadTasks();
  try {
    tasks.splice(index - 1, 1);
    saveTasks(tasks);
  } catch (error) {
    console.log("Index not found");
  }
};

const command = process.argv[2];
const argument = process.argv[3];

if (command === "add") addTask(argument);
else if (command === "list") listTasks();
else if (command === "remove") remove(parseInt(argument));
else console.log("Not found");
