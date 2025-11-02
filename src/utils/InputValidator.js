import Lotto from "../Lotto.js";

class InputValidator {
  static LOTTO_PRICE = 1000;

  static validatePurchaseAmount(amount) {
    this.validateAmountType(amount);
    this.validateAmountDivisible(amount);
    this.validateAmountPositive(amount);
  }

  static validateAmountType(amount) {
    const amountNumber = Number(amount);
    if (isNaN(amountNumber)) {
      throw new Error("[ERROR] 로또 구입 금액은 숫자여야 합니다.");
    }
  }

  static validateAmountDivisible(amount) {
    const amountNumber = Number(amount);
    if (amountNumber % InputValidator.LOTTO_PRICE !== 0) {
      throw new Error(
        "[ERROR] 로또 구입 금액은 1,000원 단위로 입력해야 합니다."
      );
    }
  }

  static validateAmountPositive(amount) {
    const amountNumber = Number(amount);
    if (amountNumber <= 0) {
      throw new Error("[ERROR] 로또 구입 금액은 양수여야 합니다.");
    }
  }

  static validateWinningNumbers(numbers) {
    this.validateNumberCount(numbers);
    this.validateNumberRange(numbers);
    this.validateUniqueNumbers(numbers);
  }

  static validateNumberCount(numbers) {
    if (numbers.length !== Lotto.LOTTO_NUMBER_COUNT) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
  }

  static validateNumberRange(numbers) {
    const outOfRange = numbers.some(
      (number) => number < Lotto.MIN_NUMBER || number > Lotto.MAX_NUMBER
    );
    if (outOfRange) {
      throw new Error(
        "[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다."
      );
    }
  }

  static validateUniqueNumbers(numbers) {
    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== numbers.length) {
      throw new Error("[ERROR] 로또 번호에 중복된 숫자가 있습니다.");
    }
  }

  static validateBonusNumber(bonusNumber, winningNumbers) {
    this.validateBonusRange(bonusNumber);
    this.validateBonusDuplicate(bonusNumber, winningNumbers);
  }

  static validateBonusRange(bonusNumber) {
    if (
      bonusNumber < Lotto.MIN_NUMBER ||
      bonusNumber > Lotto.MAX_NUMBER
    ) {
      throw new Error(
        "[ERROR] 보너스 번호는 1부터 45 사이의 숫자여야 합니다."
      );
    }
  }

  static validateBonusDuplicate(bonusNumber, winningNumbers) {
    if (winningNumbers.includes(bonusNumber)) {
      throw new Error(
        "[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다."
      );
    }
  }
}

export default InputValidator;

