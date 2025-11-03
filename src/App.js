import LottoController from "./controllers/LottoController.js";

class App {
  async run() {
    const controller = new LottoController();
    await controller.run();
  }
}

export default App;