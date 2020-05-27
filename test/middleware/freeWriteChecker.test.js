const assert = require("assert");
const expect = require("chai").expect;
const freeWriteChecker = require("../../middleware/freeWriteChecker");
const fs = require("fs").promises;
const path = require("path");
const readFile = async (file) => {
  try {
    return await fs.readFile(path.resolve(__dirname, file), "utf8");
  } catch (error) {
    console.log(error);
  }
};

describe("Free Write Checker", () => {
  it("exists", () => {
    expect(freeWriteChecker).to.not.be.undefined;
  });
  it("counts the number of words in a string", async () => {
    const testFreeWrite = await readFile("./test.txt");
    expect(freeWriteChecker.wordCount(testFreeWrite)).to.equal(54);
  });
});
