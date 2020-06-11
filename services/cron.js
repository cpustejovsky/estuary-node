var CronJob = require("cron").CronJob;
console.log("Before job instantiation");

const daily = new CronJob(
  "*/1 * * * * *",
  function () {
    console.log("Every 1s");
  },
  null,
  true,
  "America/Los_Angeles"
);
const weekly = new CronJob(
  "*/5 * * * * *",
  function () {
    console.log("Every 5s");
  },
  null,
  true,
  "America/Los_Angeles"
);
console.log("After job instantiation");

daily.start();
weekly.start();
