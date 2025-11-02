import { MissionUtils } from "@woowacourse/mission-utils";

class OutputView {
  static printLottos(lottos) {
    const count = lottos.length;
    MissionUtils.Console.print(`\n${count}개를 구매했습니다.`);
    lottos.forEach((lotto) => {
      const numbers = lotto.getNumbers();
      MissionUtils.Console.print(`[${numbers.join(", ")}]`);
    });
  }

  static printStatisticsHeader() {
    MissionUtils.Console.print("\n당첨 통계");
    MissionUtils.Console.print("---");
  }

  static printPrizeStatistics(statistics) {
    MissionUtils.Console.print(
      `3개 일치 (5,000원) - ${statistics[5]}개`
    );
    MissionUtils.Console.print(
      `4개 일치 (50,000원) - ${statistics[4]}개`
    );
    MissionUtils.Console.print(
      `5개 일치 (1,500,000원) - ${statistics[3]}개`
    );
    MissionUtils.Console.print(
      `5개 일치, 보너스 볼 일치 (30,000,000원) - ${statistics[2]}개`
    );
    MissionUtils.Console.print(
      `6개 일치 (2,000,000,000원) - ${statistics[1]}개`
    );
  }

  static printProfitRate(profitRate) {
    MissionUtils.Console.print(`총 수익률은 ${profitRate}%입니다.`);
  }

  static print(message) {
    MissionUtils.Console.print(message);
  }
}

export default OutputView;

