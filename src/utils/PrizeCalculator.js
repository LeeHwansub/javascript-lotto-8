class PrizeCalculator {
  static RANK = {
    FIRST: 1,
    SECOND: 2,
    THIRD: 3,
    FOURTH: 4,
    FIFTH: 5,
    NONE: 0,
  };

  static MATCH_COUNT = {
    FIRST: 6,
    SECOND: 5,
    THIRD: 5,
    FOURTH: 4,
    FIFTH: 3,
  };

  static PRIZE_AMOUNTS = {
    1: 2000000000,
    2: 30000000,
    3: 1500000,
    4: 50000,
    5: 5000,
  };

  static PROFIT_RATE_MULTIPLIER = 100;
  static PROFIT_RATE_DECIMAL_PLACES = 1;

  static determineRank(matchCount, hasBonus) {
    if (matchCount === PrizeCalculator.MATCH_COUNT.FIRST) {
      return PrizeCalculator.RANK.FIRST;
    }
    if (
      matchCount === PrizeCalculator.MATCH_COUNT.SECOND &&
      hasBonus
    ) {
      return PrizeCalculator.RANK.SECOND;
    }
    if (matchCount === PrizeCalculator.MATCH_COUNT.THIRD) {
      return PrizeCalculator.RANK.THIRD;
    }
    if (matchCount === PrizeCalculator.MATCH_COUNT.FOURTH) {
      return PrizeCalculator.RANK.FOURTH;
    }
    if (matchCount === PrizeCalculator.MATCH_COUNT.FIFTH) {
      return PrizeCalculator.RANK.FIFTH;
    }
    return PrizeCalculator.RANK.NONE;
  }

  static calculatePrizeAmount(rank) {
    if (rank === PrizeCalculator.RANK.NONE) {
      return 0;
    }
    return PrizeCalculator.PRIZE_AMOUNTS[rank];
  }

  static calculateStatistics(lottos, winningNumbers, bonusNumber) {
    const statistics = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    lottos.forEach((lotto) => {
      const matchCount = lotto.countMatchingNumbers(winningNumbers);
      const hasBonus = lotto.hasBonusNumber(bonusNumber);
      const rank = PrizeCalculator.determineRank(matchCount, hasBonus);

      if (rank !== PrizeCalculator.RANK.NONE) {
        statistics[rank]++;
      }
    });

    return statistics;
  }

  static calculateTotalPrizeAmount(statistics) {
    let totalAmount = 0;
    Object.keys(statistics).forEach((rank) => {
      const count = statistics[rank];
      const prizeAmount = PrizeCalculator.calculatePrizeAmount(Number(rank));
      totalAmount += count * prizeAmount;
    });
    return totalAmount;
  }

  static calculateProfitRate(totalPrize, purchaseAmount) {
    const profitRate =
      (totalPrize / purchaseAmount) *
      PrizeCalculator.PROFIT_RATE_MULTIPLIER;
    const multiplier = Math.pow(10, PrizeCalculator.PROFIT_RATE_DECIMAL_PLACES);
    return Math.round(profitRate * multiplier) / multiplier;
  }
}

export default PrizeCalculator;

