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
    return freeWrite
      .split("\n")
      .filter(
        (element) =>
          element[0] !== "#" && element[1].toString().toUpperCase() !== "N"
      )
      .join("\n");
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
