const fs = require("fs");
const os = require("os");
const EventEmitter = require("events");

class Logger extends EventEmitter {
  log(memory) {
    this.emit("memory", memory);
  }
}

const logFile = "./logFile.txt";
const logger = new Logger();
const logToFile = (event) =>
  fs.appendFileSync(logFile, `${new Date().toISOString()} : ${event}\n`);

logger.on("memory", logToFile);

setInterval(() => {
  logger.log(
    `Current memory usage: ${((os.totalmem - os.freemem) / os.totalmem) * 100}`
  );
}, 5000);

logger.log("Application started\n");
