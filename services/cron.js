var CronJob = require("cron").CronJob;
console.log("Before job instantiation");

const logger = () => {
  console.log("testing with outside function")
}

const logger2 = () => {
  console.log("#2 testing with outside function")
}

const cronJobs = {
  dailyCron(func) {
    let job = new CronJob(
      "*/1 * * * * *",
      func,
      null,
      true,
      "America/Los_Angeles"
    );
    return job
  },
  weeklyCron(func) {
    let job = new CronJob(
      "*/2 * * * * *",
      func,
      null,
      true,
      "America/Los_Angeles"
    );
    return job
  },
};

console.log("After job instantiation");

cronJobs.dailyCron(logger).start()
cronJobs.weeklyCron(logger2).start()

