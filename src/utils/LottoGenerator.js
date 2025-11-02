import { MissionUtils } from "@woowacourse/mission-utils";
import Lotto from "../Lotto.js";

class LottoGenerator {
  static generateLottoNumbers() {
    const numbers = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
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

