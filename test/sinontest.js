const sinon = require("sinon");
const assert = require("assert");
const expect = require("chai").expect
function once(fn) {
  var returnValue,
    called = false;
  return function () {
    if (!called) {
      called = true;
      returnValue = fn.apply(this, arguments);
    }
    return returnValue;
  };
}
describe("Sinon Testing", () => {
  //TODO: learn more about fakes: https://sinonjs.org/releases/v9.0.2/fakes/
  it("calls the original function", function () {
    var callback = sinon.fake();
    var proxy = once(callback);

    proxy();

    assert(callback.called);
  });
  it("calls the original function only once", function () {
    var callback = sinon.fake();
    var proxy = once(callback);

    proxy();
    proxy();

    assert(callback.calledOnce);
    // ...or:
    // assert.equals(callback.callCount, 1);
  });
  it("calls original function with right this and args", function () {
    var callback = sinon.fake();
    var proxy = once(callback);
    var obj = {};

    proxy.call(obj, "a", "b", "c");

    assert(callback.calledOn(obj));
    assert(callback.calledWith("a", "b", "c"));
  });
  it("returns the return value from the original function", function () {
    var callback = sinon.fake.returns("hello, world");
    var proxy = once(callback);

    expect(proxy()).to.eq("hello, world");
});
});
