const fs = require("fs");

function initialize() {
  const options = {
    path: process.argv[2]
  };
  return new Promise(function(resolve, reject) {
    fs.readFile(options.path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
wordCount = string => {
  let stringArr = string.split(" ");
  let counter = 0;
  stringArr.forEach(element => {
    if (element.length > 0) {
      counter++;
    }
  });
  return counter;
};

noteChecker = string => {
  notes = [];
  stringArrNL = string.split("\n");
  stringArrNL.forEach(element => {
    if (element[0] === "#" && element[1] === "n") {
      notes.push(element.slice(2));
    }
  });
  return notes;
};

function main() {
  let initializePromise = initialize();
  initializePromise.then(
    result => {
      readableStream = result.toString();
      wordCount = wordCount(readableStream);
      notes = noteChecker(readableStream);
      let newLineCount = 0;
      for (let index = 0; index < readableStream.length; index++) {
        if (readableStream[index] === "\n") newLineCount++;
      }
      console.log(`Word Count: ${wordCount + newLineCount}`);
      console.log(`Here are the notes: ${notes}`);
    },
    err => {
      console.log(err);
    }
  );
}

main();
