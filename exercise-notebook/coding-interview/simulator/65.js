const assert = require("assert");

// s: string - 0과 1로 이뤄진 문자열
// return: 제거된 모든 0의 개서
function solution(s) {
  let result = 0;
  function convertBinary(s) {
    // s의 0을 제거하고 제거한 0의 개수를 더합니다.
    const new_s = s
      .split("")
      .filter((el) => el !== "0")
      .join("");

    result += s.length - new_s.length;

    // s의 길이 c를 구합니다.
    const c = new_s.length;

    // c를 이진수로 변환합니다.
    const binary_c = c.toString(2);

    if (binary_c === "1") {
      return;
    }
    // -> 이진수가 1이 되면 함수를 0의 개수를 리턴합니다.
    convertBinary(binary_c);
  }
  // 위 과정을 제귀적으로 바녹합니다

  convertBinary(s);

  return result;
}

assert(solution("0111010", 5));
