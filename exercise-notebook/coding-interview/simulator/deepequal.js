var assert = require("assert");

// objA, objB: 원시형, 배열, 객체 -
// return: boolean - 두 인지가 같은지 여부
function deepEqual(objA, objB) {
  // 두 인자의 타입이 같지 않을 때
  if (typeof objA !== typeof objB) {
    return false;
  }

  // 원시형 일때
  // 값을 비교하기
  if (typeof objA !== "object" && typeof objB !== "object") {
    // NaN === NaN 은 JS에서 같지 않음
    if (Number.isNaN(objA) && Number.isNaN(objB)) return true;
    return objA === objB;
  }

  // 배열일 때
  // 둘다 배열인지 확인하기
  // if (Array.isArray(objA) && Array.isArray(objB)) {
  //   // 둘의 길이가 같은지 확인하기
  //   if (objA.length !== objB.length) return false;

  //   // 순회하면서 각각의 요소를 비교하기 - deepEqual로 재귀적으로 비교하기
  //   for (let i = 0; i < objA.length; i++) {
  //     if (!deepEqual(objA[i], objB[i])) return false;
  //   }
  // }

  // 객체일 때
  // 둘다 객체인지 확인

  if (typeof objA === "object" && typeof objB === "object") {
    // 둘다 배열이 아닌지 확인
    // if (!Array.isArray(objA) && !Array.isArray(objB)) {
      // 둘다 key의 길이가 같은지 확인
      if (Object.keys(objA).length !== Object.keys(objB).length) return false;

      // objA의 key 기준으로 value가 같은지 비교하기 - deepEqual로 재귀적으로 비교하기
      for (const key of Object.keys(objA)) {
        if (!deepEqual(objA[key], objB[key])) return false;
      }
    // }
  }

  return true;
}

// 가장 심플한 동작부터 테스트를 작성하자
assert.equal(deepEqual("a", {}), false);

assert.equal(deepEqual("a", "a"), true);

assert.equal(deepEqual("a", "b"), false);

assert.equal(deepEqual(["a", "b", "c"], ["a", "b", "c"]), true);

assert.equal(
  deepEqual(
    {
      a: "b",
    },
    {
      a: "b",
    }
  ),
  true
);

assert.equal(
  deepEqual(
    {
      a: {
        b: "a",
      },
    },
    {
      a: {
        b: "a",
      },
    }
  ),
  true
);

assert.equal(
  deepEqual(
    {
      a: {
        b: ["a"],
      },
    },
    {
      a: {
        b: ["a"],
      },
    }
  ),
  true
);
assert.equal(
  deepEqual(
    {
      a: {
        b: [
          "a",
          {
            a: "b",
          },
        ],
      },
    },
    {
      a: {
        b: [
          "a",
          {
            a: "c",
          },
        ],
      },
    }
  ),
  false
);
