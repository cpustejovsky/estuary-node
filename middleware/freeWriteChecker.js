module.exports = {
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
    return string
      .split("\n")
      .filter(
        (element) =>
          element[0] === "#" && element[1].toString().toUpperCase() === "N"
      );
  },
};
