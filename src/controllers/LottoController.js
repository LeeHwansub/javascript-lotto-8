import InputView from "../views/InputView.js";
import OutputView from "../views/OutputView.js";
import InputValidator from "../utils/InputValidator.js";
import LottoGenerator from "../utils/LottoGenerator.js";
import PrizeCalculator from "../utils/PrizeCalculator.js";
import Lotto from "../Lotto.js";

class LottoController {
  async run() {
    const lottos = await this.purchaseLottos();
    OutputView.printLottos(lottos);

    const winningNumbers = await this.getWinningNumbers();
    const bonusNumber = await this.getBonusNumber(winningNumbers);

    this.calculateResults(lottos, winningNumbers, bonusNumber);
  }

  async purchaseLottos() {
    while (true) {
      try {
        const input = await InputView.readPurchaseAmount();
        InputValidator.validatePurchaseAmount(input);

        const purchaseAmount = Number(input);
        const lottoCount = this.calculateLottoCount(purchaseAmount);
        return LottoGenerator.generateLottos(lottoCount);
      } catch (error) {
        OutputView.print(error.message);
      }
    }
  }

  calculateLottoCount(purchaseAmount) {
    return purchaseAmount / InputValidator.LOTTO_PRICE;
  }

  async getWinningNumbers() {
    while (true) {
      try {
        const input = await InputView.readWinningNumbers();
        const numbers = this.parseWinningNumbers(input);

        InputValidator.validateWinningNumbers(numbers);
        return numbers;
      } catch (error) {
        OutputView.print(error.message);
      }
    }
  }

  parseWinningNumbers(input) {
    return input.split(",").map((number) => Number(number.trim()));
  }

  async getBonusNumber(winningNumbers) {
    while (true) {
      try {
        const input = await InputView.readBonusNumber();
        const bonusNumber = Number(input.trim());

        InputValidator.validateBonusNumber(bonusNumber, winningNumbers);
        return bonusNumber;
      } catch (error) {
        OutputView.print(error.message);
      }
    }
  }

  calculateResults(lottos, winningNumbers, bonusNumber) {
    const statistics = PrizeCalculator.calculateStatistics(
      lottos,
      winningNumbers,
      bonusNumber
    );
    this.printResults(statistics, lottos.length);
  }

  printResults(statistics, lottoCount) {
    OutputView.printStatisticsHeader();
    OutputView.printPrizeStatistics(statistics);

    const totalPrize = PrizeCalculator.calculateTotalPrizeAmount(statistics);
    const purchaseAmount = lottoCount * InputValidator.LOTTO_PRICE;
    const profitRate = PrizeCalculator.calculateProfitRate(
      totalPrize,
      purchaseAmount
    );

    OutputView.printProfitRate(profitRate);
  }
}

export default LottoController;

