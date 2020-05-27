const freeWriteCheckerObject = {
  //TODO: Refine wordCount; It takes every newline as a new character.
  wordCount(string) {
    return string
      .split(/\s/)
      .reduce(
        (acc, curVal) =>
          curVal.length > 0 && curVal !== "#n" && curVal !== "#N"
            ? (acc += 1)
            : (acc += 0),
        0
      );
  },
  noteRemover(freeWrite) {
    let stringArrNL = freeWrite.split("\n");
    stringArrNL.forEach((element) => {
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
    stringArrNL.forEach((element) => {
      if (element[0] === "#" && element[1].toString().toUpperCase() === "N") {
        notes.push(element.slice(2));
      }
    });
    return notes;
  },
};
module.exports = freeWriteCheckerObject;
