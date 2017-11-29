@testable
class MytestableClass {
  // ....
}
function testable(target) {
  target.isTestable = true;
  console.log(this);
  console.log(target);
}
MytestableClass.isTestable