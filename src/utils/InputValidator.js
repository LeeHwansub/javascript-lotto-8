import Lotto from "../Lotto.js";

class InputValidator {
  static LOTTO_PRICE = 1000;

  static validatePurchaseAmount(amount) {
    this.validateAmountType(amount);
    this.validateAmountDivisible(amount);
    this.validateAmountPositive(amount);
  }

  static validateAmountType(amount) {
    const trimmedAmount = String(amount).trim();
    if (trimmedAmount === "") {
      throw new Error("[ERROR] 로또 구입 금액을 입력해 주세요.");
    }

    const amountNumber = Number(trimmedAmount);
    if (isNaN(amountNumber)) {
      throw new Error("[ERROR] 로또 구입 금액은 숫자여야 합니다.");
    }

    if (!Number.isInteger(amountNumber)) {
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

  static validateWinningNumbers(input) {
    const numbers = this.parseWinningNumbers(input);
    this.validateNumberCount(numbers);
    this.validateNumberRange(numbers);
    this.validateUniqueNumbers(numbers);
    return numbers;
  }

  static parseWinningNumbers(input) {
    if (!input || input.trim() === "") {
      throw new Error("[ERROR] 당첨 번호를 입력해 주세요.");
    }

    const numbers = input.split(",").map((number) => {
      const trimmed = number.trim();
      if (trimmed === "") {
        throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
      }

      const parsed = Number(trimmed);
      if (isNaN(parsed)) {
        throw new Error(
          "[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다."
        );
      }

      if (!Number.isInteger(parsed)) {
        throw new Error(
          "[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다."
        );
      }

      return parsed;
    });

    return numbers;
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

  static validateBonusNumber(input, winningNumbers) {
    const bonusNumber = this.parseBonusNumber(input);
    this.validateBonusRange(bonusNumber);
    this.validateBonusDuplicate(bonusNumber, winningNumbers);
    return bonusNumber;
  }

  static parseBonusNumber(input) {
    const trimmedInput = input.trim();

    if (trimmedInput === "") {
      throw new Error("[ERROR] 보너스 번호를 입력해 주세요.");
    }

    const bonusNumber = Number(trimmedInput);
    if (isNaN(bonusNumber)) {
      throw new Error(
        "[ERROR] 보너스 번호는 1부터 45 사이의 숫자여야 합니다."
      );
    }

    if (!Number.isInteger(bonusNumber)) {
      throw new Error(
        "[ERROR] 보너스 번호는 1부터 45 사이의 숫자여야 합니다."
      );
    }

    return bonusNumber;
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

