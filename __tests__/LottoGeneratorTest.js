import LottoGenerator from "../src/utils/LottoGenerator.js";
import { MissionUtils } from "@woowacourse/mission-utils";

describe("LottoGenerator 테스트", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("로또 번호를 생성한다.", () => {
    const mockNumbers = [8, 21, 23, 41, 42, 43];
    MissionUtils.Random.pickUniqueNumbersInRange = jest.fn(() => mockNumbers);

    const lotto = LottoGenerator.generateLottoNumbers();

    expect(MissionUtils.Random.pickUniqueNumbersInRange).toHaveBeenCalledWith(
      1,
      45,
      6
    );
    expect(lotto.getNumbers()).toEqual([8, 21, 23, 41, 42, 43]);
  });

  test("로또 번호는 오름차순으로 정렬된다.", () => {
    const mockNumbers = [21, 8, 41, 43, 23, 42];
    MissionUtils.Random.pickUniqueNumbersInRange = jest.fn(() => mockNumbers);

    const lotto = LottoGenerator.generateLottoNumbers();

    expect(lotto.getNumbers()).toEqual([8, 21, 23, 41, 42, 43]);
  });

  test("여러 개의 로또를 생성한다.", () => {
    const mockNumbers1 = [1, 2, 3, 4, 5, 6];
    const mockNumbers2 = [7, 8, 9, 10, 11, 12];
    MissionUtils.Random.pickUniqueNumbersInRange = jest
      .fn()
      .mockReturnValueOnce(mockNumbers1)
      .mockReturnValueOnce(mockNumbers2);

    const lottos = LottoGenerator.generateLottos(2);

    expect(lottos).toHaveLength(2);
    expect(lottos[0].getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
    expect(lottos[1].getNumbers()).toEqual([7, 8, 9, 10, 11, 12]);
  });

  test("생성된 로또 번호는 1~45 범위 내에 있다.", () => {
    const mockNumbers = [1, 15, 30, 45, 22, 38];
    MissionUtils.Random.pickUniqueNumbersInRange = jest.fn(() => mockNumbers);

    const lotto = LottoGenerator.generateLottoNumbers();

    const numbers = lotto.getNumbers();
    numbers.forEach((number) => {
      expect(number).toBeGreaterThanOrEqual(1);
      expect(number).toBeLessThanOrEqual(45);
    });
  });

  test("생성된 로또 번호는 중복되지 않는다.", () => {
    const mockNumbers = [1, 2, 3, 4, 5, 6];
    MissionUtils.Random.pickUniqueNumbersInRange = jest.fn(() => mockNumbers);

    const lotto = LottoGenerator.generateLottoNumbers();

    const numbers = lotto.getNumbers();
    const uniqueNumbers = new Set(numbers);
    expect(uniqueNumbers.size).toBe(6);
  });
});