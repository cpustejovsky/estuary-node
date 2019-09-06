const assert = require("assert");
const User = require("../../models/user.js");

describe("Free Write Checker Functionality", () => {
  it("counts the words", done => {
    function wordCount(string) {
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
    }
    let testString = "I am testing the number of words here";
    assert(wordCount(testString) === 8);

    done();
  });
});
