var assert = require("assert");

// obj - 원시값, 객체, 배열 타입 데이터
// return - obj의 값들을 복사한 새로운 객체
function deepCopy(obj) {
  // obj가 원시 값일 때
  if (typeof obj !== "object") {
    return obj;
  }

  // obj가 배열일 때
  if (Array.isArray(obj)) {
    return obj.map((item) => deepCopy(item));
  }

  // obj가 객체일 때
  // 새로운 객체를 하나 만들기
  // 객체의 키와 값을 순화하면서 값을 copy -deepcopy 재귀
  if (typeof obj === "object") {
    const new_obj = {};
    for (const [k, v] of Object.entries(obj)) {
      new_obj[k] = deepCopy(v);
    }

    return new_obj;
  }
}

assert(deepCopy("a") === "a");
assert(deepCopy(2) === 2);

assert(deepCopy(["1", "2", "3"])[1] === "2");
assert(deepCopy(["1", "2", "3"])[2] === "3");
assert(
  deepCopy({
    a: "b",
  })["a"] === "b"
);

assert(
  deepCopy({
    a: {
      b: "c",
    },
  })["a"]["b"] === "c"
);
