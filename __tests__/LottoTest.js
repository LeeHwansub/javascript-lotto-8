import Lotto from "../src/Lotto";

describe("로또 클래스 테스트", () => {
  test("로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow("[ERROR]");
  });

  test("로또 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow("[ERROR]");
  });

  test("로또 번호가 1~45 범위를 벗어나면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 46]);
    }).toThrow("[ERROR]");
    expect(() => {
      new Lotto([0, 1, 2, 3, 4, 5]);
    }).toThrow("[ERROR]");
  });

  test("로또 번호는 오름차순으로 정렬된다.", () => {
    const lotto = new Lotto([21, 8, 41, 43, 23, 42]);
    expect(lotto.getNumbers()).toEqual([8, 21, 23, 41, 42, 43]);
  });

  test("당첨 번호와 일치하는 개수를 계산한다.", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    expect(lotto.countMatchingNumbers([1, 2, 3, 7, 8, 9])).toBe(3);
    expect(lotto.countMatchingNumbers([1, 2, 3, 4, 5, 6])).toBe(6);
    expect(lotto.countMatchingNumbers([7, 8, 9, 10, 11, 12])).toBe(0);
  });

  test("보너스 번호 포함 여부를 확인한다.", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    expect(lotto.hasBonusNumber(7)).toBe(false);
    expect(lotto.hasBonusNumber(6)).toBe(true);
  });

});