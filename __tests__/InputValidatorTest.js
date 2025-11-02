import InputValidator from "../src/utils/InputValidator.js";

describe("InputValidator 테스트", () => {
  describe("구입 금액 검증", () => {
    test("1,000원 단위가 아닌 경우 예외가 발생한다.", () => {
      expect(() => {
        InputValidator.validatePurchaseAmount("1500");
      }).toThrow("[ERROR] 로또 구입 금액은 1,000원 단위로 입력해야 합니다.");
      expect(() => {
        InputValidator.validatePurchaseAmount("999");
      }).toThrow("[ERROR] 로또 구입 금액은 1,000원 단위로 입력해야 합니다.");
    });

    test("숫자가 아닌 경우 예외가 발생한다.", () => {
      expect(() => {
        InputValidator.validatePurchaseAmount("abc");
      }).toThrow("[ERROR] 로또 구입 금액은 숫자여야 합니다.");
      expect(() => {
        InputValidator.validatePurchaseAmount("1000j");
      }).toThrow("[ERROR] 로또 구입 금액은 숫자여야 합니다.");
    });

    test("양수가 아닌 경우 예외가 발생한다.", () => {
      expect(() => {
        InputValidator.validatePurchaseAmount("0");
      }).toThrow("[ERROR] 로또 구입 금액은 양수여야 합니다.");
      expect(() => {
        InputValidator.validatePurchaseAmount("-1000");
      }).toThrow("[ERROR] 로또 구입 금액은 양수여야 합니다.");
    });

    test("올바른 구입 금액은 예외가 발생하지 않는다.", () => {
      expect(() => {
        InputValidator.validatePurchaseAmount("1000");
      }).not.toThrow();
      expect(() => {
        InputValidator.validatePurchaseAmount("8000");
      }).not.toThrow();
      expect(() => {
        InputValidator.validatePurchaseAmount("14000");
      }).not.toThrow();
    });
  });

  describe("당첨 번호 검증", () => {
    test("6개가 아닌 경우 예외가 발생한다.", () => {
      expect(() => {
        InputValidator.validateWinningNumbers([1, 2, 3, 4, 5]);
      }).toThrow("[ERROR] 로또 번호는 6개여야 합니다.");
      expect(() => {
        InputValidator.validateWinningNumbers([1, 2, 3, 4, 5, 6, 7]);
      }).toThrow("[ERROR] 로또 번호는 6개여야 합니다.");
    });

    test("1~45 범위를 벗어난 경우 예외가 발생한다.", () => {
      expect(() => {
        InputValidator.validateWinningNumbers([0, 1, 2, 3, 4, 5]);
      }).toThrow("[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.");
      expect(() => {
        InputValidator.validateWinningNumbers([1, 2, 3, 4, 5, 46]);
      }).toThrow("[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.");
    });

    test("중복이 있는 경우 예외가 발생한다.", () => {
      expect(() => {
        InputValidator.validateWinningNumbers([1, 2, 3, 4, 5, 5]);
      }).toThrow("[ERROR] 로또 번호에 중복된 숫자가 있습니다.");
    });

    test("올바른 당첨 번호는 예외가 발생하지 않는다.", () => {
      expect(() => {
        InputValidator.validateWinningNumbers([1, 2, 3, 4, 5, 6]);
      }).not.toThrow();
    });
  });

  describe("보너스 번호 검증", () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];

    test("1~45 범위를 벗어난 경우 예외가 발생한다.", () => {
      expect(() => {
        InputValidator.validateBonusNumber(0, winningNumbers);
      }).toThrow("[ERROR] 보너스 번호는 1부터 45 사이의 숫자여야 합니다.");
      expect(() => {
        InputValidator.validateBonusNumber(46, winningNumbers);
      }).toThrow("[ERROR] 보너스 번호는 1부터 45 사이의 숫자여야 합니다.");
    });

    test("당첨 번호와 중복되는 경우 예외가 발생한다.", () => {
      expect(() => {
        InputValidator.validateBonusNumber(1, winningNumbers);
      }).toThrow("[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.");
      expect(() => {
        InputValidator.validateBonusNumber(6, winningNumbers);
      }).toThrow("[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.");
    });

    test("올바른 보너스 번호는 예외가 발생하지 않는다.", () => {
      expect(() => {
        InputValidator.validateBonusNumber(7, winningNumbers);
      }).not.toThrow();
      expect(() => {
        InputValidator.validateBonusNumber(45, winningNumbers);
      }).not.toThrow();
    });
  });
});

