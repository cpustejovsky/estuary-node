const freeWriteCheckerObject = {
  //TODO: Refine wordCount; It takes every newline as a new character.
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
    return counter;
  },
  noteRemover(freeWrite) {
    let stringArrNL = freeWrite.split("\n");
    stringArrNL.forEach(element => {
      if (element[0] === "#" && element[1].toString().toUpperCase() === "N") {
        let noteElem = stringArrNL.indexOf(element);
        stringArrNL.splice(noteElem, 1);
      }
    });
    let cleanFreeWrite = stringArrNL.join("\n");
    return cleanFreeWrite;
  },
  noteChecker(string) {
    notes = [];
    stringArrNL = string.split("\n");
    stringArrNL.forEach(element => {
      if (element[0] === "#" && element[1].toString().toUpperCase() === "N") {
        notes.push(element.slice(2));
      }
    });
    return notes;
  }
};
module.exports = freeWriteCheckerObject;
