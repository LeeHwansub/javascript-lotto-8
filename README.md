# javascript-lotto-precourse

##  로또

간단한 로또 발매기를 구현하는 미션입니다. 사용자가 구매 금액을 입력하면 해당 금액만큼 로또를 발행하고, 당첨 번호와 보너스 번호를 입력받아 당첨 내역과 수익률을 계산하여 출력합니다.

##  목차

- [프로젝트 구조](#프로젝트-구조)
- [기능 목록](#-기능-목록)
- [아키텍처 설계](#-아키텍처-설계-mvp-패턴)
- [입출력 형식](#-입출력-형식)
- [예외 처리](#-예외-처리)
- [테스트 전략](#-테스트-전략)
- [프로그래밍 요구사항](#-프로그래밍-요구사항)

##  프로젝트 구조

```
src/
├── App.js                    # 프로그램 진입점
├── index.js                  # 실행 파일
├── Lotto.js                  # 로또 모델 클래스
├── views/
│   ├── InputView.js         # 입력 처리 뷰
│   └── OutputView.js        # 출력 처리 뷰
├── controllers/
│   └── LottoController.js   # 비즈니스 로직 컨트롤러
└── utils/
    ├── InputValidator.js    # 입력 검증 유틸리티
    ├── LottoGenerator.js    # 로또 번호 생성 유틸리티
    └── PrizeCalculator.js   # 당첨 계산 유틸리티

__tests__/
├── LottoTest.js             # Lotto 클래스 단위 테스트
├── InputValidatorTest.js    # 입력 검증 테스트
├── LottoGeneratorTest.js    # 로또 생성 테스트
├── PrizeCalculatorTest.js   # 당첨 계산 테스트
└── ApplicationTest.js       # 통합 테스트
```

##  기능 목록

### 1. 입력 기능

#### 1.1 로또 구입 금액 입력
- **설명**: 사용자로부터 로또 구입 금액을 입력받습니다.
- **입력 형식**: 정수 (예: `8000`, `14000`)
- **프롬프트**: "구입금액을 입력해 주세요."
- **처리**: `InputView.readPurchaseAmount()`

#### 1.2 당첨 번호 입력
- **설명**: 당첨 번호 6개를 쉼표로 구분하여 입력받습니다.
- **입력 형식**: 쉼표로 구분된 정수 (예: `1,2,3,4,5,6`)
- **프롬프트**: "당첨 번호를 입력해 주세요."
- **처리**: `InputView.readWinningNumbers()`

#### 1.3 보너스 번호 입력
- **설명**: 보너스 번호 1개를 입력받습니다.
- **입력 형식**: 정수 (예: `7`)
- **프롬프트**: "보너스 번호를 입력해 주세요."
- **처리**: `InputView.readBonusNumber()`

### 2. 검증 기능

#### 2.1 로또 구입 금액 검증
- **검증 항목**:
  - 1,000원 단위로 나누어 떨어져야 함
  - 양수여야 함
  - 숫자 형식이어야 함
- **예외 메시지**: `"[ERROR] 로또 구입 금액은 1,000원 단위로 입력해야 합니다."`
- **처리**: `InputValidator.validatePurchaseAmount(amount)`
- **재입력**: 예외 발생 시 해당 입력부터 다시 받기

#### 2.2 로또 번호 검증 (개수)
- **검증 항목**: 정확히 6개의 숫자여야 함
- **예외 메시지**: `"[ERROR] 로또 번호는 6개여야 합니다."` (Lotto 클래스)
- **처리**: `Lotto.#validate(numbers)`

#### 2.3 로또 번호 검증 (범위)
- **검증 항목**: 각 숫자가 1 이상 45 이하여야 함
- **예외 메시지**: `"[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다."`
- **처리**: `InputValidator.validateNumberRange(numbers)`

#### 2.4 로또 번호 검증 (중복)
- **검증 항목**: 6개 숫자 중 중복이 없어야 함
- **예외 메시지**: `"[ERROR] 로또 번호에 중복된 숫자가 있습니다."`
- **처리**: `InputValidator.validateUniqueNumbers(numbers)`

#### 2.5 당첨 번호 검증
- **검증 항목**:
  - 개수: 6개
  - 범위: 1~45
  - 중복: 없어야 함
- **처리**: `InputValidator.validateWinningNumbers(numbers)`

#### 2.6 보너스 번호 검증
- **검증 항목**:
  - 범위: 1~45
  - 당첨 번호와 중복되지 않아야 함
- **예외 메시지**: `"[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다."`
- **처리**: `InputValidator.validateBonusNumber(bonusNumber, winningNumbers)`

#### 2.7 예외 처리 및 재입력
- **설명**: 모든 검증 실패 시 "[ERROR]"로 시작하는 메시지 출력 후 재입력
- **처리**: `LottoController`에서 try-catch로 처리

### 3. 로또 발행 기능

#### 3.1 발행 수량 계산
- **설명**: 구입 금액을 1,000으로 나눈 몫이 발행 수량
- **예시**: 8,000원 → 8장
- **처리**: `LottoController.calculateLottoCount(purchaseAmount)`

#### 3.2 로또 번호 생성
- **설명**: Random API를 사용하여 중복되지 않는 6개의 숫자 생성 (1~45 범위)
- **API 사용**: `MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6)`
- **처리**: `LottoGenerator.generateLottoNumbers()`
- **반환**: `Lotto` 인스턴스 배열

#### 3.3 로또 번호 정렬
- **설명**: 생성된 로또 번호를 오름차순으로 정렬
- **처리**: `Lotto` 생성 시 자동 정렬 또는 별도 메서드
- **예시**: `[21, 8, 41, 43, 23, 42]` → `[8, 21, 23, 41, 42, 43]`

### 4. 출력 기능

#### 4.1 발행한 로또 수량 및 번호 출력
- **출력 형식**:
  ```
  8개를 구매했습니다.
  [8, 21, 23, 41, 42, 43]
  [3, 5, 11, 16, 32, 38]
  ...
  ```
- **처리**: `OutputView.printLottos(lottos)`

#### 4.2 당첨 통계 헤더 출력
- **출력 형식**:
  ```
  당첨 통계
  ---
  ```
- **처리**: `OutputView.printStatisticsHeader()`

#### 4.3 당첨 내역 출력
- **출력 형식**:
  ```
  3개 일치 (5,000원) - 1개
  4개 일치 (50,000원) - 0개
  5개 일치 (1,500,000원) - 0개
  5개 일치, 보너스 볼 일치 (30,000,000원) - 0개
  6개 일치 (2,000,000,000원) - 0개
  ```
- **처리**: `OutputView.printPrizeStatistics(statistics)`

#### 4.4 총 수익률 출력
- **출력 형식**: `총 수익률은 62.5%입니다.`
- **수익률 계산**: `(총 당첨 금액 / 구입 금액) * 100`
- **반올림**: 소수점 둘째 자리에서 반올림
- **처리**: `OutputView.printProfitRate(profitRate)`

### 5. 당첨 계산 기능

#### 5.1 일치 개수 계산
- **설명**: 로또 번호와 당첨 번호를 비교하여 일치하는 개수 계산
- **처리**: `Lotto.countMatchingNumbers(winningNumbers)`
- **반환**: 일치하는 개수 (0~6)

#### 5.2 보너스 번호 일치 확인
- **설명**: 로또 번호에 보너스 번호가 포함되어 있는지 확인
- **처리**: `Lotto.hasBonusNumber(bonusNumber)`
- **반환**: `true` 또는 `false`

#### 5.3 등수 판정
- **등수 기준**:
  - **1등**: 6개 일치 → 2,000,000,000원
  - **2등**: 5개 일치 + 보너스 일치 → 30,000,000원
  - **3등**: 5개 일치 → 1,500,000원
  - **4등**: 4개 일치 → 50,000원
  - **5등**: 3개 일치 → 5,000원
  - **꽝**: 2개 이하 일치 → 0원
- **처리**: `PrizeCalculator.determineRank(matchCount, hasBonus)`
- **반환**: 등수 (1~5) 또는 0 (꽝)

#### 5.4 당첨 금액 계산
- **설명**: 각 등수별 당첨 금액 상수 정의 및 계산
- **상수 정의**: `PrizeCalculator.PRIZE_AMOUNTS`
- **처리**: `PrizeCalculator.calculatePrizeAmount(rank)`

#### 5.5 통계 계산
- **설명**: 발행한 모든 로또에 대한 당첨 통계 계산
- **처리**: `PrizeCalculator.calculateStatistics(lottos, winningNumbers, bonusNumber)`
- **반환**: 등수별 당첨 개수 객체

#### 5.6 총 당첨 금액 계산
- **설명**: 모든 당첨 로또의 총 당첨 금액 계산
- **처리**: `PrizeCalculator.calculateTotalPrizeAmount(statistics)`

#### 5.7 수익률 계산
- **설명**: `(총 당첨 금액 / 구입 금액) * 100`
- **반올림**: 소수점 둘째 자리에서 반올림
- **처리**: `PrizeCalculator.calculateProfitRate(totalPrize, purchaseAmount)`
- **반환**: 수익률 (예: 62.5)

### 6. Lotto 클래스 확장

#### 6.1 중복 검증 추가
- **설명**: `#validate()` 메서드에 중복 검증 로직 추가
- **처리**: `Lotto.#validateDuplicate(numbers)`

#### 6.2 범위 검증 추가
- **설명**: `#validate()` 메서드에 범위 검증 로직 추가 (1~45)
- **처리**: `Lotto.#validateRange(numbers)`

#### 6.3 일치 개수 계산 메서드
- **설명**: 당첨 번호와 비교하여 일치하는 개수 반환
- **시그니처**: `countMatchingNumbers(winningNumbers: number[]): number`
- **처리**: `Lotto.countMatchingNumbers(winningNumbers)`

#### 6.4 보너스 번호 확인 메서드
- **설명**: 보너스 번호 포함 여부 확인
- **시그니처**: `hasBonusNumber(bonusNumber: number): boolean`
- **처리**: `Lotto.hasBonusNumber(bonusNumber)`

#### 6.5 번호 정렬 기능
- **설명**: 생성자에서 번호를 오름차순으로 정렬
- **처리**: `Lotto` 생성자 내부에서 정렬 수행

##  아키텍처 설계 (MVP 패턴)

### Model (데이터 및 도메인 로직)

#### Lotto
- **책임**: 로또 번호 데이터 관리 및 기본 검증
- **속성**: 
  - `#numbers`: 로또 번호 배열 (private)
- **메서드**:
  - `constructor(numbers)`: 로또 생성 및 검증
  - `#validate(numbers)`: 기본 검증 (개수, 중복, 범위)
  - `#validateDuplicate(numbers)`: 중복 검증
  - `#validateRange(numbers)`: 범위 검증
  - `countMatchingNumbers(winningNumbers)`: 일치 개수 계산
  - `hasBonusNumber(bonusNumber)`: 보너스 번호 확인
  - `getNumbers()`: 번호 배열 반환 (정렬된 상태)

### View (입출력 처리)

#### InputView
- **책임**: 사용자 입력 처리
- **메서드**:
  - `async readPurchaseAmount()`: 구입 금액 입력
  - `async readWinningNumbers()`: 당첨 번호 입력
  - `async readBonusNumber()`: 보너스 번호 입력
  - `async readLine(query)`: 공통 입력 메서드

#### OutputView
- **책임**: 결과 출력 처리
- **메서드**:
  - `printLottos(lottos)`: 발행한 로또 출력
  - `printStatisticsHeader()`: 통계 헤더 출력
  - `printPrizeStatistics(statistics)`: 당첨 내역 출력
  - `printProfitRate(profitRate)`: 수익률 출력
  - `print(message)`: 공통 출력 메서드

### Presenter (비즈니스 로직 및 흐름 제어)

#### LottoController
- **책임**: 전체 게임 흐름 제어 및 비즈니스 로직 조합
- **의존성**: InputView, OutputView, LottoGenerator, PrizeCalculator, InputValidator
- **메서드**:
  - `async run()`: 메인 실행 메서드
  - `async purchaseLottos()`: 로또 구매 처리
  - `async getWinningNumbers()`: 당첨 번호 입력 처리
  - `async getBonusNumber()`: 보너스 번호 입력 처리
  - `calculateResults()`: 당첨 결과 계산 및 출력

### 유틸리티 (순수 함수)

#### InputValidator
- **책임**: 입력 값 검증 로직
- **메서드**:
  - `validatePurchaseAmount(amount)`: 구입 금액 검증
  - `validateWinningNumbers(numbers)`: 당첨 번호 검증
  - `validateBonusNumber(bonusNumber, winningNumbers)`: 보너스 번호 검증
  - `validateNumberRange(numbers)`: 범위 검증
  - `validateUniqueNumbers(numbers)`: 중복 검증

#### LottoGenerator
- **책임**: 로또 번호 생성 로직
- **의존성**: Random API
- **메서드**:
  - `generateLottoNumbers()`: 단일 로또 번호 생성 (Lotto 인스턴스 반환)
  - `generateLottos(count)`: 여러 개의 로또 생성

#### PrizeCalculator
- **책임**: 당첨 금액 및 등수 계산 로직
- **상수**:
  - `PRIZE_AMOUNTS`: 등수별 당첨 금액 객체
- **메서드**:
  - `determineRank(matchCount, hasBonus)`: 등수 판정
  - `calculatePrizeAmount(rank)`: 당첨 금액 계산
  - `calculateStatistics(lottos, winningNumbers, bonusNumber)`: 통계 계산
  - `calculateTotalPrizeAmount(statistics)`: 총 당첨 금액 계산
  - `calculateProfitRate(totalPrize, purchaseAmount)`: 수익률 계산