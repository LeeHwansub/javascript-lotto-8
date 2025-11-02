import { MissionUtils } from "@woowacourse/mission-utils";
import Lotto from "../Lotto.js";

class LottoGenerator {
  static generateLottoNumbers() {
    const numbers = MissionUtils.Random.pickUniqueNumbersInRange(
      Lotto.MIN_NUMBER,
      Lotto.MAX_NUMBER,
      Lotto.LOTTO_NUMBER_COUNT
    );
    return new Lotto(numbers);
  }

  static generateLottos(count) {
    const lottos = [];
    for (let i = 0; i < count; i++) {
      lottos.push(this.generateLottoNumbers());
    }
    return lottos;
  }
}

export default LottoGenerator;

