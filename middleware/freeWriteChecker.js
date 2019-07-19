const freeWriteCheckerObject = {
  wordCount(string) {
    let stringArr = string.split(" ");
    let counter = 0;
    stringArr.forEach(element => {
      if (element.length > 0) {
        counter++;
      }
    });
    let newLineCount = 0;
    for (let index = 0; index < string.length; index++) {
      if (string[index] === "\n") newLineCount++;
    }
    counter += newLineCount;
    console.log(counter);
    return counter;
  },
  noteChecker(string) {
    notes = [];
    stringArrNL = string.split("\n");
    stringArrNL.forEach(element => {
      if (element[0] === "#" && element[1] === "N") {
        notes.push(element.slice(2));
      }
    });
    console.log(notes);
    return notes;
  }
};
module.exports = freeWriteCheckerObject;
