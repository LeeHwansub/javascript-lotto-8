import PrizeCalculator from "../src/utils/PrizeCalculator.js";
import Lotto from "../src/Lotto.js";

describe("PrizeCalculator 테스트", () => {
  describe("등수 판정", () => {
    test("1등을 판정한다. (6개 일치)", () => {
      expect(PrizeCalculator.determineRank(6, false)).toBe(1);
      expect(PrizeCalculator.determineRank(6, true)).toBe(1);
    });

    test("2등을 판정한다. (5개 일치 + 보너스)", () => {
      expect(PrizeCalculator.determineRank(5, true)).toBe(2);
    });

    test("3등을 판정한다. (5개 일치)", () => {
      expect(PrizeCalculator.determineRank(5, false)).toBe(3);
    });

    test("4등을 판정한다. (4개 일치)", () => {
      expect(PrizeCalculator.determineRank(4, false)).toBe(4);
      expect(PrizeCalculator.determineRank(4, true)).toBe(4);
    });

    test("5등을 판정한다. (3개 일치)", () => {
      expect(PrizeCalculator.determineRank(3, false)).toBe(5);
      expect(PrizeCalculator.determineRank(3, true)).toBe(5);
    });

    test("꽝을 판정한다. (2개 이하 일치)", () => {
      expect(PrizeCalculator.determineRank(2, false)).toBe(0);
      expect(PrizeCalculator.determineRank(1, false)).toBe(0);
      expect(PrizeCalculator.determineRank(0, false)).toBe(0);
    });
  });

  describe("당첨 금액 계산", () => {
    test("등수별 당첨 금액을 반환한다.", () => {
      expect(PrizeCalculator.calculatePrizeAmount(1)).toBe(2000000000);
      expect(PrizeCalculator.calculatePrizeAmount(2)).toBe(30000000);
      expect(PrizeCalculator.calculatePrizeAmount(3)).toBe(1500000);
      expect(PrizeCalculator.calculatePrizeAmount(4)).toBe(50000);
      expect(PrizeCalculator.calculatePrizeAmount(5)).toBe(5000);
      expect(PrizeCalculator.calculatePrizeAmount(0)).toBe(0);
    });
  });

  describe("통계 계산", () => {
    test("로또들의 당첨 통계를 계산한다.", () => {
      const lottos = [
        new Lotto([1, 2, 3, 4, 5, 6]),
        new Lotto([1, 2, 3, 7, 8, 9]),
        new Lotto([7, 8, 9, 10, 11, 12]),
      ];
      const winningNumbers = [1, 2, 3, 4, 5, 6];
      const bonusNumber = 7;

      const statistics = PrizeCalculator.calculateStatistics(
        lottos,
        winningNumbers,
        bonusNumber
      );

      expect(statistics[1]).toBe(1);
      expect(statistics[2]).toBe(0);
      expect(statistics[3]).toBe(0);
      expect(statistics[4]).toBe(0);
      expect(statistics[5]).toBe(1);
    });

    test("보너스 번호를 포함한 5개 일치는 2등이다.", () => {
      const lottos = [new Lotto([1, 2, 3, 4, 5, 7])];
      const winningNumbers = [1, 2, 3, 4, 5, 6];
      const bonusNumber = 7;

      const statistics = PrizeCalculator.calculateStatistics(
        lottos,
        winningNumbers,
        bonusNumber
      );

      expect(statistics[2]).toBe(1);
      expect(statistics[3]).toBe(0);
    });

    test("보너스 번호를 포함하지 않은 5개 일치는 3등이다.", () => {
      const lottos = [new Lotto([1, 2, 3, 4, 5, 8])];
      const winningNumbers = [1, 2, 3, 4, 5, 6];
      const bonusNumber = 7;

      const statistics = PrizeCalculator.calculateStatistics(
        lottos,
        winningNumbers,
        bonusNumber
      );

      expect(statistics[2]).toBe(0);
      expect(statistics[3]).toBe(1);
    });
  });

  describe("총 당첨 금액 계산", () => {
    test("통계를 기반으로 총 당첨 금액을 계산한다.", () => {
      const statistics = {
        1: 1,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      };

      const totalAmount = PrizeCalculator.calculateTotalPrizeAmount(statistics);

      expect(totalAmount).toBe(2000000000);
    });

    test("여러 등수의 당첨 금액을 합산한다.", () => {
      const statistics = {
        1: 0,
        2: 1,
        3: 1,
        4: 1,
        5: 1,
      };

      const totalAmount = PrizeCalculator.calculateTotalPrizeAmount(statistics);

      expect(totalAmount).toBe(30000000 + 1500000 + 50000 + 5000);
    });
  });

  describe("수익률 계산", () => {
    test("수익률을 소수점 둘째 자리에서 반올림하여 계산한다.", () => {
      expect(PrizeCalculator.calculateProfitRate(5000, 8000)).toBe(62.5);
      expect(PrizeCalculator.calculateProfitRate(10000, 10000)).toBe(100.0);
      expect(PrizeCalculator.calculateProfitRate(5000, 10000)).toBe(50.0);
      expect(PrizeCalculator.calculateProfitRate(3333, 10000)).toBe(33.3);
    });

    test("당첨 금액이 0인 경우 수익률은 0이다.", () => {
      expect(PrizeCalculator.calculateProfitRate(0, 1000)).toBe(0);
    });
  });
});