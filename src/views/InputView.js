import { MissionUtils } from "@woowacourse/mission-utils";

class InputView {
  static async readPurchaseAmount() {
    const input = await MissionUtils.Console.readLineAsync(
      "구입금액을 입력해 주세요.\n"
    );
    return input;
  }

  static async readWinningNumbers() {
    const input = await MissionUtils.Console.readLineAsync(
      "\n당첨 번호를 입력해 주세요.\n"
    );
    return input;
  }

  static async readBonusNumber() {
    const input = await MissionUtils.Console.readLineAsync(
      "\n보너스 번호를 입력해 주세요.\n"
    );
    return input;
  }

  static async readLine(query) {
    const input = await MissionUtils.Console.readLineAsync(query);
    return input;
  }
}

export default InputView;